const currentYear = new Date().getFullYear();
const range = (start: number, stop: number, step: number) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));
const years = range(currentYear, 1901, -1);

export { years };