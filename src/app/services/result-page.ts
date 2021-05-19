export interface ResultPage<T> {
  results: T[];
  count: number;
  next?: string;
  previous?: string;
}
