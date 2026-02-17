import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { password, action, payload } = await req.json();
    const adminPassword = Deno.env.get('ADMIN_PASSWORD');

    if (!adminPassword || password !== adminPassword) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // READ operations
    if (action === 'list-episodes') {
      const { data, error } = await supabase
        .from('episodes')
        .select('id, slug, title, guest_name, guest_company, published, status, episode_number, promoted_at, updated_at')
        .neq('status', 'deleted')
        .order('episode_number', { ascending: true });
      if (error) return respond(400, { error: error.message });
      return respond(200, { data });
    }

    if (action === 'get-episode') {
      const { data, error } = await supabase
        .from('episodes')
        .select('*')
        .eq('id', payload.id)
        .single();
      if (error) return respond(400, { error: error.message });
      return respond(200, { data });
    }

    if (action === 'list-hosts') {
      const { data, error } = await supabase
        .from('hosts')
        .select('*')
        .order('name');
      if (error) return respond(400, { error: error.message });
      return respond(200, { data });
    }

    if (action === 'list-speakers') {
      const { data, error } = await supabase
        .from('speakers')
        .select('*')
        .order('name');
      if (error) return respond(400, { error: error.message });
      return respond(200, { data });
    }

    // WRITE operations
    if (action === 'upsert-episode') {
      const { id, ...rest } = payload;
      const { data, error } = id
        ? await supabase.from('episodes').update(rest).eq('id', id).select().single()
        : await supabase.from('episodes').insert(rest).select().single();
      if (error) return respond(400, { error: error.message });
      return respond(200, { data });
    }

    if (action === 'delete-episode') {
      const { error } = await supabase.from('episodes').delete().eq('id', payload.id);
      if (error) return respond(400, { error: error.message });
      return respond(200, { success: true });
    }

    if (action === 'upsert-host') {
      const { id, ...rest } = payload;
      const { data, error } = id
        ? await supabase.from('hosts').update(rest).eq('id', id).select().single()
        : await supabase.from('hosts').insert(rest).select().single();
      if (error) return respond(400, { error: error.message });
      return respond(200, { data });
    }

    if (action === 'delete-host') {
      const { error } = await supabase.from('hosts').delete().eq('id', payload.id);
      if (error) return respond(400, { error: error.message });
      return respond(200, { success: true });
    }

    if (action === 'upsert-speaker') {
      const { id, ...rest } = payload;
      const { data, error } = id
        ? await supabase.from('speakers').update(rest).eq('id', id).select().single()
        : await supabase.from('speakers').insert(rest).select().single();
      if (error) return respond(400, { error: error.message });
      return respond(200, { data });
    }

    if (action === 'delete-speaker') {
      const { error } = await supabase.from('speakers').delete().eq('id', payload.id);
      if (error) return respond(400, { error: error.message });
      return respond(200, { success: true });
    }

    // Episode-host mappings
    if (action === 'get-episode-hosts') {
      const { data, error } = await supabase
        .from('episode_hosts')
        .select('host_id')
        .eq('episode_id', payload.episode_id);
      if (error) return respond(400, { error: error.message });
      return respond(200, { data: data.map((r: { host_id: string }) => r.host_id) });
    }

    if (action === 'set-episode-hosts') {
      // Delete existing, then insert new
      await supabase.from('episode_hosts').delete().eq('episode_id', payload.episode_id);
      if (payload.host_ids && payload.host_ids.length > 0) {
        const rows = payload.host_ids.map((host_id: string) => ({
          episode_id: payload.episode_id,
          host_id,
        }));
        const { error } = await supabase.from('episode_hosts').insert(rows);
        if (error) return respond(400, { error: error.message });
      }
      return respond(200, { success: true });
    }

    // Newsletter mentions
    if (action === 'get-newsletters') {
      const { data, error } = await supabase
        .from('newsletter_mentions')
        .select('id, title, url, source')
        .eq('episode_id', payload.episode_id)
        .order('created_at');
      if (error) return respond(400, { error: error.message });
      return respond(200, { data });
    }

    if (action === 'set-newsletters') {
      await supabase.from('newsletter_mentions').delete().eq('episode_id', payload.episode_id);
      if (payload.newsletters && payload.newsletters.length > 0) {
        const rows = payload.newsletters.map((n: { title: string; url: string; source?: string }) => ({
          episode_id: payload.episode_id,
          title: n.title,
          url: n.url,
          source: n.source || null,
        }));
        const { error } = await supabase.from('newsletter_mentions').insert(rows);
        if (error) return respond(400, { error: error.message });
      }
      return respond(200, { success: true });
    }

    // Promote episode to live
    if (action === 'promote-to-live') {
      const { id } = payload;
      // Fetch staging episode
      const { data: ep, error: epErr } = await supabase
        .from('episodes')
        .select('*')
        .eq('id', id)
        .single();
      if (epErr || !ep) return respond(400, { error: epErr?.message || 'Episode not found' });

      // Fetch staging hosts
      const { data: hostLinks } = await supabase
        .from('episode_hosts')
        .select('host_id')
        .eq('episode_id', id);

      // Upsert into live_episodes
      const liveData = {
        staging_id: ep.id,
        slug: ep.slug,
        title: ep.title,
        subtitle: ep.subtitle,
        episode_number: ep.episode_number,
        description: ep.description,
        full_description: ep.full_description,
        duration: ep.duration,
        guest_name: ep.guest_name,
        guest_title: ep.guest_title,
        guest_company: ep.guest_company,
        guest_company_domain: ep.guest_company_domain,
        guest_bio: ep.guest_bio,
        guest_image_url: ep.guest_image_url,
        guest_linkedin_url: ep.guest_linkedin_url,
        poster_image_url: ep.poster_image_url,
        og_image_url: ep.og_image_url,
        preview_video_url: ep.preview_video_url,
        apple_url: ep.apple_url,
        spotify_url: ep.spotify_url,
        youtube_url: ep.youtube_url,
        publish_date: ep.publish_date,
        status: ep.status,
        topics: ep.topics,
        pull_quote: ep.pull_quote,
        pull_quote_attribution: ep.pull_quote_attribution,
        promoted_at: new Date().toISOString(),
      };

      const { data: existing } = await supabase
        .from('live_episodes')
        .select('id')
        .eq('staging_id', id)
        .maybeSingle();

      let liveEpisodeId: string;
      if (existing) {
        const { error } = await supabase.from('live_episodes').update(liveData).eq('id', existing.id);
        if (error) return respond(400, { error: error.message });
        liveEpisodeId = existing.id;
      } else {
        const { data: inserted, error } = await supabase.from('live_episodes').insert(liveData).select('id').single();
        if (error) return respond(400, { error: error.message });
        liveEpisodeId = inserted.id;
      }

      // Sync live host mappings
      await supabase.from('live_episode_hosts').delete().eq('live_episode_id', liveEpisodeId);
      if (hostLinks && hostLinks.length > 0) {
        const rows = hostLinks.map((h: { host_id: string }) => ({
          live_episode_id: liveEpisodeId,
          host_id: h.host_id,
        }));
        await supabase.from('live_episode_hosts').insert(rows);
      }

      // Update promoted_at on staging
      await supabase.from('episodes').update({ promoted_at: new Date().toISOString() }).eq('id', id);

      return respond(200, { success: true, promoted_at: new Date().toISOString() });
    }

    // Unpromote (remove from live)
    if (action === 'unpromote-from-live') {
      const { id } = payload;
      await supabase.from('live_episodes').delete().eq('staging_id', id);
      await supabase.from('episodes').update({ promoted_at: null }).eq('id', id);
      return respond(200, { success: true });
    }

    // Batch reorder episodes
    if (action === 'reorder-episodes') {
      const { orders } = payload; // [{ id, episode_number }]
      if (!Array.isArray(orders)) return respond(400, { error: 'orders must be an array' });
      for (const { id, episode_number } of orders) {
        const { error } = await supabase.from('episodes').update({ episode_number }).eq('id', id);
        if (error) return respond(400, { error: error.message });
      }
      return respond(200, { success: true });
    }

    return respond(400, { error: 'Unknown action' });
  } catch {
    return respond(400, { error: 'Bad request' });
  }
});

function respond(status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}
