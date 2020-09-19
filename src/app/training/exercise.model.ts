
export enum State {
  'completed',
  'cancelled',
  null
}

export interface Exercise {
  id: string;
  name: string;
  duration: number; // seconds
  calories: number;
  date?: Date;
  state?: State;
}
