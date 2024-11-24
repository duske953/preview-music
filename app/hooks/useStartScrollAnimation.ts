import { useInView, useAnimation } from 'framer-motion';
import { useEffect, useRef } from 'react';
export default function useStartScrollAnimation() {
  const animationRef = useRef(null);
  const inView = useInView(animationRef);
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start('visible');
  }, [inView, controls]);

  return { animationRef, controls };
}
