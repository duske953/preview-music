import { ForwardedRef, forwardRef } from 'react';

const ForwardIcon = forwardRef(function IconPause(
  props: { children: React.ReactNode },
  ref: ForwardedRef<HTMLSpanElement>
) {
  return (
    <span className="inline-block" ref={ref}>
      {props.children}
    </span>
  );
});

export default ForwardIcon;
