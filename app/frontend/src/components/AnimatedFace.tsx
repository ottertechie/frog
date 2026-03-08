/**
 * AnimatedFace
 * A tiny reactive face so Frog never feels "dead" when idle.
 * This is intentionally lightweight for MVP.
 */
import { useEffect, useState } from 'react';

type FaceState = 'idle' | 'attentive' | 'thinking' | 'responding' | 'error';

export function AnimatedFace({ state }: { state: FaceState }) {
  const [blink, setBlink] = useState(false);
  const [look, setLook] = useState(0);

  useEffect(() => {
    const blinkTimer = setInterval(() => setBlink((b) => !b), 2200);
    const lookTimer = setInterval(() => setLook((v) => (v + 1) % 3), 1700);
    return () => {
      clearInterval(blinkTimer);
      clearInterval(lookTimer);
    };
  }, []);

  const eye = blink ? '-' : look === 0 ? '•' : look === 1 ? '◕' : '•';
  const mouth = state === 'thinking' ? '~' : state === 'responding' ? 'ᗣ' : state === 'error' ? '︵' : '‿';

  return <div className="face">{eye} {mouth} {eye}</div>;
}
