export const DEFINED_DATES = ['today', 'yesterday', 'this-week', 'last-week', 'this-month', 'last-month'] as const;

export type DefinedDateTypes = typeof DEFINED_DATES[number];
