import { useState } from 'react';
import user from '@/public/user.png';
export default function useErrorImg() {
  const [imgError, setImgError] = useState({ src: user, error: false });

  function handleErrorImg() {
    setImgError({ src: user, error: true });
  }

  return { imgError, handleErrorImg, setImgError };
}
