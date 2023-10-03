import { useState, useEffect } from 'react';

const useWindowClick = (ref, initialState) => {
  const [open, setOpen] = useState(initialState);

  useEffect(() => {
    const pageClickEvent = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
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

export default useWindowClick;
