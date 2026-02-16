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
        .select('id, slug, title, guest_name, guest_company, published, episode_number')
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
