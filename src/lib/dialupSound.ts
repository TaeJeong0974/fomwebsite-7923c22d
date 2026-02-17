/**
 * Plays the AOL dial-up modem sound from an MP3 file.
 */
export function playDialupSound(duration = 2.5): { stop: () => void } {
  const audio = new Audio("/sounds/dial-up-modem.mp3");
  audio.volume = 0.4;
  audio.play().catch(() => {});

  const timeout = setTimeout(() => {
    audio.pause();
  }, duration * 1000);

  return {
    stop: () => {
      clearTimeout(timeout);
      audio.pause();
      audio.currentTime = 0;
    },
  };
}
