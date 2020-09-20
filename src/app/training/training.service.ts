import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Exercise, State } from './exercise.model';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private availableExercises: Exercise[] = [];

  private storageKey = 'fitness_tracker_exercises';

  exerciseChanged: Subject<Exercise> = new Subject<Exercise>();
  exercisesChanged: BehaviorSubject<Exercise[]> = new BehaviorSubject<Exercise[]>([]);
  finishedExercisesChenged: BehaviorSubject<Exercise[]> = new BehaviorSubject<Exercise[]>([]);

  private runningExercise: Exercise;

  private finishedExercises: Exercise[] = [];

  constructor(private db: AngularFirestore) {

  }

  fetchAvailableExercises(): BehaviorSubject<Exercise[]> {
    this.db.collection('availableExercises')
      .snapshotChanges()
      .pipe(map(actions => actions.map(this.documentToDomainObject)))
      .subscribe((exercises: Exercise[]) => {
        console.log('exercises::', exercises);
        this.availableExercises = exercises;
        this.exercisesChanged.next([...this.availableExercises]);
      });
    return this.exercisesChanged;
  }

  startExercise(selectedId: string) {
    this.db.doc('availableExercises/' + selectedId).update({
      lastSelected: new Date()
    });
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
    this.addDataToDatabase(exercise);
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
    this.addDataToDatabase(exercise);
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }

  fecthCompletedOrCanceled() {
    this.db.collection('finishedExercises')
      .valueChanges()
      .subscribe((exercises: Exercise[]) => {
        this.finishedExercisesChenged.next(exercises);
      });
  }

  private documentToDomainObject = _ => {
    const object = _.payload.doc.data();
    object.id = _.payload.doc.id;
    return object;
  }

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise);
  }
}
