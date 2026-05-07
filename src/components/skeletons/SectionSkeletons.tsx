"use client";

import { motion } from "framer-motion";

const shimmer = "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-foreground/[0.04] before:to-transparent";

const Bone = ({ className }: { className?: string }) => (
  <div className={`rounded-lg bg-foreground/[0.06] ${shimmer} ${className ?? ""}`} />
);

/** Matches PodcastSection grid layout */
export const PodcastSkeleton = () => (
  <section className="pt-16 md:pt-20 lg:pt-24 pb-14 md:pb-16 lg:pb-20">
    <div className="container mx-auto container-padding">
      {/* Header */}
      <div className="flex items-end justify-between gap-4 mb-8 md:mb-10 lg:mb-12">
        <div>
          <Bone className="h-3 w-20 mb-3" />
          <Bone className="h-10 w-40" />
        </div>
        <Bone className="h-10 w-28 rounded-full" />
      </div>
      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-gap">
        {[...Array(6)].map((_, i) => (
          <Bone key={i} className="aspect-[3/4] rounded-xl" />
        ))}
      </div>
    </div>
  </section>
);

/** Matches EventsSection layout */
export const EventsSkeleton = () => (
  <section className="section-spacing overflow-hidden">
    <div className="container mx-auto container-padding">
      <div className="relative">
        <Bone className="h-24 sm:h-36 lg:h-48 w-3/4 mb-[-2rem] lg:mb-[-5rem] rounded-xl" />
        <div className="flex flex-col lg:flex-row lg:items-end gap-6">
          <div className="hidden lg:flex flex-col w-1/4 gap-3 pb-4">
            <Bone className="h-4 w-32" />
            <Bone className="h-16 w-full" />
            <Bone className="h-4 w-24 mt-4" />
          </div>
          <Bone className="w-full lg:w-3/4 aspect-[16/9] rounded-xl" />
        </div>
      </div>
    </div>
  </section>
);

/** Matches CTASection layout */
export const CTASkeleton = () => (
  <section className="section-spacing">
    <div className="container mx-auto container-padding">
      <div className="grid grid-cols-1 md:grid-cols-2 grid-gap">
        <Bone className="aspect-[3/4] rounded-xl" />
        <Bone className="aspect-[3/4] rounded-xl" />
      </div>
    </div>
  </section>
);

/** Combined fallback for all lazy sections */
const SectionsFallback = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
  >
    <PodcastSkeleton />
    <EventsSkeleton />
    <CTASkeleton />
  </motion.div>
);

export default SectionsFallback;