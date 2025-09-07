export type ColumnSelection<T> = {
  [K in keyof T]?: boolean;
} & {
  all?: boolean;
};

export type SelectedColumns<T, C extends ColumnSelection<T>> = {
  [K in keyof T as K extends keyof C
    ? C[K] extends true
      ? K
      : never
    : never]: T[K];
};
