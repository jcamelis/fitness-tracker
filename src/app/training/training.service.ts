import { Injectable } from '@angular/core';
import { Subject, of } from 'rxjs';
import { Exercise, State } from './exercise.model';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private availableExercises: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpess', name: 'Burpees', duration: 60, calories: 8 }
  ];

  private storageKey = 'fitness_tracker_exercises';

  exerciseChanged: Subject<Exercise> = new Subject<Exercise>();

  private runningExercise: Exercise;

  private exercises: Exercise[] = [];

  constructor() {
    const storageExercies = localStorage.getItem(this.storageKey);
    this.exercises = storageExercies ? JSON.parse(storageExercies) : [];
  }

  getExercises() {
    return of(this.availableExercises.slice());
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId);
    this.exerciseChanged.next({ ...this.runningExercise });
  }

  stopExercise() {
    this.exerciseChanged.next(null);
  }

  completeExercise(){
    const exercise = {
      ...this.runningExercise,
      date: new Date(),
      state: State.completed
    };
    this.addExercise(exercise);
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    const exercise = {
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: State.cancelled
    };
    this.addExercise(exercise);
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }

  getCompletedOrCanceled() {
    return [...this.exercises];
  }

  private addExercise(exercise: Exercise) {
    this.exercises.push(exercise);
    localStorage.setItem(this.storageKey, JSON.stringify(this.exercises));
  }
}
