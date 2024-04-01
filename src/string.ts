import { random } from './number';

export const datetime = (
  date: Date | string | number,
  withTime = true,
): string => {
  let options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  };

  if (withTime) {
    options = {
      ...options,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short',
      hour12: false,
    };
  }

  const result = new Date(date).toLocaleString(navigator.language, options);
  return result.replace(',', '');
};

export const bytes = (value: number, decimals = 2): string => {
  const units = ['B', 'KB', 'MB', 'GB'];
  const unit = Math.floor(Math.log(value) / Math.log(1024));
  const result = (value / Math.pow(1024, unit)).toFixed(decimals);
  return `${result} ${units[unit]}`;
};

export const code = (length = 10, chars = 'all'): string => {
  const lowerLetters = 'abcdefghijklmnopqrstuvwxyz';
  const upperLetters = lowerLetters.toUpperCase();
  const numbers = '0123456789';
  const symbols = '!$%&=?^+*@#.:,;-_';

  const options: Record<string, string> = {
    all: upperLetters + lowerLetters + numbers + symbols,
    alphanumeric: upperLetters + lowerLetters + numbers,
    letters: upperLetters + lowerLetters,
    'lower-letters': lowerLetters,
    numbers,
    symbols,
    'upper-letters': upperLetters,
  };

  const charset = options[chars] || chars;

  const characters = Array.from({ length }, () => {
    const index = random(0, charset.length - 1);
    return charset.charAt(index);
  });

  return characters.join('');
};

export const color = (): string => {
  return '#' + code(6, '0123456789ABCDEF');
};

export const pad = (
  value: number | string,
  length: number, symbol: string,
): string => {
  let result = value.toString();

  for (let i = result.length; i < length; i++) {
    result = symbol + result;
  }

  return result;
};
