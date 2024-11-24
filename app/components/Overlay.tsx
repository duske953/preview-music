'use client';
import { useActiveMusicStore } from '../stores/activeMusicStore';
import { AnimatePresence, motion } from 'framer-motion';
import useErrorImg from '../hooks/useErrorImg';
export default function Overlay() {
  const updateActiveMusic = useActiveMusicStore((state) => state.updateMusic);
  const activeMusic = useActiveMusicStore((state) => state.activeMusic);
  const { setImgError } = useErrorImg();
  function handleOverlayAction() {
    updateActiveMusic({ ...activeMusic, bgPlay: true });
    setImgError({ src: null, error: false });
  }

  return (
    <AnimatePresence>
      {activeMusic.active && !activeMusic.bgPlay && (
        <motion.div
          onClick={handleOverlayAction}
          className="fixed top-0 left-0 size-full backdrop-blur-2xl cursor-pointer z-40"
        >
          &nbsp;
        </motion.div>
      )}
    </AnimatePresence>
  );
}
