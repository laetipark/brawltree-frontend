import { useEffect, useState } from 'react';

export const useWindowClick = (ref, initialState) => {
  const [open, setOpen] = useState(initialState);

  useEffect(() => {
    const pageClickEvent = ({ target }) => {
      if (ref.current && !ref.current.contains(target)) {
        setOpen(!open);
      }
    };

    if (open) {
      window.addEventListener('click', pageClickEvent);
    }

    return () => {
      window.removeEventListener('click', pageClickEvent);
    };
  }, [open, ref]);
  return [open, setOpen];
};
