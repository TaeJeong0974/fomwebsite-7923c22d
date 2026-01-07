import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Headphones, Video, Clock, Calendar, Share2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Template episode data - in a real app, this would come from a database or API
const episodeData = {
  "the-future-of-remote-work": {
    title: "The Future of Remote Work",
    description: "Exploring how distributed teams are reshaping the workplace.",
    date: "Jan 5, 2026",
    duration: "45 min",
    videoUrl: "#",
    audioUrl: "#",
    fullDescription: `In this episode, we dive deep into how remote work is fundamentally changing the way companies operate and how employees think about their careers.

Our guests share insights on building culture in distributed teams, maintaining work-life balance when your home is your office, and the technologies enabling seamless collaboration across time zones.

We also explore the challenges—from loneliness to communication gaps—and practical strategies that leading companies are using to overcome them.`,
    topics: [
      "Building remote-first culture",
      "Async communication best practices",
      "Tools for distributed collaboration",
      "Managing across time zones",
      "The future of hybrid work",
    ],
    guests: [
      {
        name: "Alex Rivera",
        title: "VP of Remote Operations",
        company: "TechFlow Inc.",
      },
      {
        name: "Jordan Lee",
        title: "Distributed Work Researcher",
        company: "Future of Work Institute",
      },
    ],
    chapters: [
      { time: "0:00", title: "Introduction" },
      { time: "3:45", title: "The shift to remote-first" },
      { time: "12:20", title: "Building culture without an office" },
      { time: "24:15", title: "Tools and technology" },
      { time: "35:00", title: "Challenges and solutions" },
      { time: "42:30", title: "What's next for remote work" },
    ],
  },
};

const EpisodeDetail = () => {
  const { slug } = useParams();
  const episode = episodeData[slug as keyof typeof episodeData];

  if (!episode) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-20">
          <p className="text-muted-foreground">Episode not found.</p>
          <Link to="/#podcast" className="text-primary hover:underline mt-4 inline-block">
            ← Back to episodes
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link
            to="/#podcast"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            Back to episodes
          </Link>

          {/* Episode Header */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Video Player Placeholder */}
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <span className="text-muted-foreground">Video Player</span>
              </div>

              {/* Title & Meta */}
              <div>
                <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
                  {episode.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar size={14} />
                    {episode.date}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock size={14} />
                    {episode.duration}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <a
                  href={episode.videoUrl}
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  <Video size={18} />
                  Watch Episode
                </a>
                <a
                  href={episode.audioUrl}
                  className="inline-flex items-center gap-2 border border-border px-5 py-2.5 rounded-lg font-medium hover:border-primary/50 transition-colors"
                >
                  <Headphones size={18} />
                  Listen
                </a>
                <button className="inline-flex items-center gap-2 border border-border px-5 py-2.5 rounded-lg font-medium hover:border-primary/50 transition-colors">
                  <Share2 size={18} />
                  Share
                </button>
              </div>

              {/* Description */}
              <div>
                <h2 className="font-display text-xl font-bold text-foreground mb-3">
                  About this episode
                </h2>
                <div className="text-muted-foreground whitespace-pre-line leading-relaxed">
                  {episode.fullDescription}
                </div>
              </div>

              {/* Topics Covered */}
              <div>
                <h2 className="font-display text-xl font-bold text-foreground mb-3">
                  Topics covered
                </h2>
                <ul className="space-y-2">
                  {episode.topics.map((topic, index) => (
                    <li key={index} className="text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Guests */}
              <div className="border border-border rounded-lg p-6">
                <h3 className="font-display text-lg font-bold text-foreground mb-4">
                  Featured Guests
                </h3>
                <div className="space-y-4">
                  {episode.guests.map((guest) => (
                    <div key={guest.name} className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm font-bold text-muted-foreground shrink-0">
                        {guest.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{guest.name}</div>
                        <div className="text-sm text-muted-foreground">{guest.title}</div>
                        <div className="text-sm text-primary">{guest.company}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chapters */}
              <div className="border border-border rounded-lg p-6">
                <h3 className="font-display text-lg font-bold text-foreground mb-4">
                  Chapters
                </h3>
                <div className="space-y-3">
                  {episode.chapters.map((chapter, index) => (
                    <button
                      key={index}
                      className="w-full text-left flex items-center gap-3 hover:text-primary transition-colors"
                    >
                      <span className="text-sm text-muted-foreground font-mono w-10">
                        {chapter.time}
                      </span>
                      <span className="text-sm text-foreground">{chapter.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default EpisodeDetail;
