import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopDialogComponent } from './stop-dialog/stop-dialog.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {

  @Output()
  public trainingExit = new EventEmitter();

  progress = 0;

  timer;

  paused: boolean;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.initTimer();
  }

  initTimer() {
    this.timer = setInterval(() => {
      this.progress = this.progress + 5;
      if (this.progress >= 100) {
        this.onStop();
      }
    }, 1000);
  }

  onStop() {
    clearInterval(this.timer);
    this.paused = false;
    const dialogRef$ = this.dialog.open(StopDialogComponent, {
      data: { progress: this.progress }
    });
    dialogRef$.afterClosed().subscribe(result => {
      if (result) {
        this.trainingExit.emit();
      } else {
        this.onStart();
      }
    });
  }

  onStart() {
    this.initTimer();
    this.paused = false;
  }

}
