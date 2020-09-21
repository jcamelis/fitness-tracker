import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { UiService } from 'src/app/shared/ui.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  loading = false;

  exercises: Exercise[] = [];

  subscriptions: Subscription[] = [];

  constructor(
    private trainingService: TrainingService,
    private uiService: UiService) { }

  ngOnInit(): void {
    this.trainingService.exercisesChanged.subscribe(r => this.exercises = r);
    this.trainingService.fetchAvailableExercises();
    this.subscriptions.push(
      this.uiService.loadingStateChanged.subscribe(
        loading => this.loading = loading
      )
    );
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }

}
