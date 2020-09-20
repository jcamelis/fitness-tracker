
export enum State {
  'completed' = 'completed',
  'cancelled' = 'cancelled'
}

export interface Exercise {
  id: string;
  name: string;
  duration: number; // seconds
  calories: number;
  date?: Date;
  state?: State;
}
