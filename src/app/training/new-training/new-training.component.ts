import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  exercises: Exercise[] = [];

  exerciseSuscription: Subscription;

  constructor(private trainingService: TrainingService, private db: AngularFirestore) {
    // this.exerciseSuscription = this.trainingService.getExercises()
    //   .subscribe(exercises => this.availableExercises = exercises);
  }

  ngOnInit(): void {
    this.trainingService.exercisesChanged.subscribe(r => this.exercises = r);
    this.trainingService.fetchAvailableExercises();
  }

  documentToDomainObject = _ => {
    const object = _.payload.doc.data();
    object.id = _.payload.doc.id;
    return object;
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

  ngOnDestroy() {
    // this.exerciseSuscription.unsubscribe();
  }

}
