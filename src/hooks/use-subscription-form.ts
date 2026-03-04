import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

interface UseSubscriptionFormOptions {
  /** Callback to run when form resets after success */
  onReset?: () => void;
  /** Reset delay in ms (default: 2500) */
  resetDelay?: number;
  /** Optional guest slug for tracking source */
  guestSlug?: string;
}

interface UseSubscriptionFormReturn {
  email: string;
  setEmail: (email: string) => void;
  isSubmitted: boolean;
  isSubmitting: boolean;
  handleSubmit: (e: React.FormEvent) => void;
  reset: () => void;
}

/**
 * Shared subscription form logic for email capture.
 * Handles state, submission to database, and auto-reset after success.
 */
export const useSubscriptionForm = ({
  onReset,
  resetDelay = 2500,
  guestSlug,
}: UseSubscriptionFormOptions = {}): UseSubscriptionFormReturn => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const reset = useCallback(() => {
    setIsSubmitted(false);
    setEmail("");
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      await supabase.from("subscribers").upsert(
        { email: email.trim().toLowerCase(), source: "website", guest_slug: guestSlug || null },
        { onConflict: "email" }
      );
    } catch {
      // Still show success to avoid leaking whether email exists
    }
    setIsSubmitting(false);
    setIsSubmitted(true);
    setEmail("");

    setTimeout(() => {
      setIsSubmitted(false);
      onReset?.();
    }, resetDelay);
  }, [email, isSubmitting, onReset, resetDelay, guestSlug]);

  return {
    email,
    setEmail,
    isSubmitted,
    isSubmitting,
    handleSubmit,
    reset,
  };
};
