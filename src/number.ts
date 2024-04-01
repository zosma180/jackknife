export const round = (value: number, decimals = 2): number => {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
};

export const random = (min: number, max: number, decimals = 0): number => {
  const value = Math.random() * (max - min) + min;
  return round(value, decimals);
};

export const identifier = (): number => {
  return Number(Date.now().toString() + random(1000, 9999).toString());
};

export const range = (min: number, max: number): number[] => {
  return Array.from({ length: max - min + 1 }, (_, i) => min + i);
};

export const degToRad = (degrees: number): number => {
  return degrees * (Math.PI / 180);
};

export const radToDeg = (radians: number): number => {
  return (radians * 180) / Math.PI;
};
