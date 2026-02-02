import { useState, useCallback } from "react";

interface UseSubscriptionFormOptions {
  /** Callback to run when form resets after success */
  onReset?: () => void;
  /** Reset delay in ms (default: 2500) */
  resetDelay?: number;
}

interface UseSubscriptionFormReturn {
  email: string;
  setEmail: (email: string) => void;
  isSubmitted: boolean;
  handleSubmit: (e: React.FormEvent) => void;
  reset: () => void;
}

/**
 * Shared subscription form logic for email capture.
 * Handles state, submission, and auto-reset after success.
 */
export const useSubscriptionForm = ({
  onReset,
  resetDelay = 2500,
}: UseSubscriptionFormOptions = {}): UseSubscriptionFormReturn => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const reset = useCallback(() => {
    setIsSubmitted(false);
    setEmail("");
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to backend when Lovable Cloud is enabled
    setIsSubmitted(true);
    setEmail("");

    setTimeout(() => {
      setIsSubmitted(false);
      onReset?.();
    }, resetDelay);
  }, [onReset, resetDelay]);

  return {
    email,
    setEmail,
    isSubmitted,
    handleSubmit,
    reset,
  };
};
