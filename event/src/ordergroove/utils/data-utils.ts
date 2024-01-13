import crypto from 'crypto';

export const addDecimalPointToCentAmount = (centAmount: number, fractionDigits: number): number => {
  const exponential = 10 ** fractionDigits;

  return centAmount / exponential;
}

export const createUUID = () : string => {
  return crypto.randomUUID();
}