export const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message;
  return String(error);
};

export const humanReadableToBoolean = (value: 'oui' | 'non') => {
  return value === 'oui' ? true : false;
};
export const booleanToHumanReadable = (value: boolean) => {
  return value ? 'oui' : 'non';
};
