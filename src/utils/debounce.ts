export const debounce = (callback, delay: number) => {
  let timer: number;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => callback(...args), delay);
  };
};
