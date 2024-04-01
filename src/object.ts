export const nested = <T>(
  root: Record<any, unknown>,
  path: string,
): T | undefined => {
  const steps = path.split('.');
  let levell = root;
  let result: T | undefined;

  for (let i = 0; i < steps.length && !!levell; i++) {
    levell = levell[steps[i]] as Record<string, unknown>;

    if (i === steps.length - 1 && levell) {
      result = levell as T;
    }
  }

  return result;
};

export const querystring = (): Record<string, string> => {
  return window.location.search
    .replace('?', '')
    .split('&')
    .reduce((result, param) => {
      const pair = param.split('=');
      result[pair[0]] = decodeURIComponent(pair[1] || '');
      return result;
    }, {} as Record<string, string>);
};

export interface LabelValue<T> {
  label: string;
  value: T;
}
