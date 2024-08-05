export const numberTransformer = {
  to: (value: number): string => value.toString(),
  from: (value: string): number => parseFloat(value),
};
