import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  availableExercises: Exercise[] = [];

  exerciseSuscription: Subscription;

  constructor(private trainingService: TrainingService) {
    this.exerciseSuscription = this.trainingService.getExercises()
      .subscribe(exercises => this.availableExercises = exercises);
  }

  ngOnInit(): void {
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

  ngOnDestroy() {
    this.exerciseSuscription.unsubscribe();
  }

}
