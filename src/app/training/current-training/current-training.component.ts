import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TrainingService } from '../training.service';
import { StopDialogComponent } from './stop-dialog/stop-dialog.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {

  progress = 0;

  timer;

  paused: boolean;

  constructor(private dialog: MatDialog, private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.onStart();
  }

  startOrResumeTimer() {
    const step = this.trainingService.getRunningExercise().duration / 100 * 1000;
    this.timer = setInterval(() => {
      this.progress = this.progress + 1;
      if (this.progress >= 100) {
        this.trainingService.completeExercise();
      }
    }, step);
  }

  onStop() {
    clearInterval(this.timer);
    this.paused = false;
    const dialogRef$ = this.dialog.open(StopDialogComponent, {
      data: { progress: this.progress }
    });
    dialogRef$.afterClosed().subscribe(result => {
      if (result) {
        this.trainingService.cancelExercise(this.progress);
      } else {
        this.onStart();
      }
    });
  }

  onStart() {
    this.startOrResumeTimer();
    this.paused = false;
  }

}
