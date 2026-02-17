/**
 * Synthesized AOL dial-up modem sound using Web Audio API.
 * Recreates the iconic sequence: dial tones → handshake screech → connection.
 */
export function playDialupSound(duration = 2.5): { stop: () => void } {
  const ctx = new AudioContext();
  const masterGain = ctx.createGain();
  masterGain.gain.value = 0.15;
  masterGain.connect(ctx.destination);

  const now = ctx.currentTime;

  // Phase 1: Touch-tone dialing (0 - 0.6s)
  const dialFreqs = [941, 1336, 770, 1209, 852, 1477, 697, 1336];
  dialFreqs.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.3, now + i * 0.07);
    gain.gain.setValueAtTime(0, now + i * 0.07 + 0.06);
    osc.connect(gain);
    gain.connect(masterGain);
    osc.start(now + i * 0.07);
    osc.stop(now + i * 0.07 + 0.07);
  });

  // Phase 2: Carrier tone (0.7 - 1.2s)
  const carrier = ctx.createOscillator();
  const carrierGain = ctx.createGain();
  carrier.type = "sine";
  carrier.frequency.value = 1070;
  carrierGain.gain.setValueAtTime(0, now + 0.65);
  carrierGain.gain.linearRampToValueAtTime(0.4, now + 0.75);
  carrierGain.gain.setValueAtTime(0.4, now + 1.15);
  carrierGain.gain.linearRampToValueAtTime(0, now + 1.25);
  carrier.connect(carrierGain);
  carrierGain.connect(masterGain);
  carrier.start(now + 0.65);
  carrier.stop(now + 1.3);

  // Phase 3: Handshake screech (1.2 - 2.2s)
  const screech = ctx.createOscillator();
  const screechGain = ctx.createGain();
  screech.type = "sawtooth";
  screech.frequency.setValueAtTime(2400, now + 1.2);
  screech.frequency.linearRampToValueAtTime(1800, now + 1.5);
  screech.frequency.setValueAtTime(2100, now + 1.6);
  screech.frequency.linearRampToValueAtTime(1200, now + 1.9);
  screech.frequency.setValueAtTime(2600, now + 2.0);
  screech.frequency.linearRampToValueAtTime(1400, now + 2.2);
  screechGain.gain.setValueAtTime(0, now + 1.2);
  screechGain.gain.linearRampToValueAtTime(0.2, now + 1.3);
  screechGain.gain.setValueAtTime(0.15, now + 2.0);
  screechGain.gain.linearRampToValueAtTime(0, now + 2.3);
  screech.connect(screechGain);
  screechGain.connect(masterGain);
  screech.start(now + 1.2);
  screech.stop(now + 2.4);

  // Phase 4: Static/noise burst (2.0 - 2.5s)
  const bufferSize = ctx.sampleRate * 0.5;
  const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = noiseBuffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * 0.3;
  }
  const noise = ctx.createBufferSource();
  const noiseGain = ctx.createGain();
  const noiseFilter = ctx.createBiquadFilter();
  noiseFilter.type = "bandpass";
  noiseFilter.frequency.value = 2000;
  noiseFilter.Q.value = 2;
  noise.buffer = noiseBuffer;
  noiseGain.gain.setValueAtTime(0, now + 2.0);
  noiseGain.gain.linearRampToValueAtTime(0.15, now + 2.1);
  noiseGain.gain.linearRampToValueAtTime(0, now + duration);
  noise.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  noiseGain.connect(masterGain);
  noise.start(now + 2.0);
  noise.stop(now + duration);

  return {
    stop: () => {
      try { ctx.close(); } catch {}
    },
  };
}
