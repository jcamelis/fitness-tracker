import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/shared/ui.service';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.scss']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = [
    'date', 'name', 'duration', 'calories', 'state'
  ];
  dataSource = new MatTableDataSource<Exercise>();

  subscriptions: Subscription[] = [];

  loading = false;

  constructor(
    private trainingService: TrainingService,
    private uiService: UiService
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(this.trainingService.finishedExercisesChenged
      .subscribe((exercises) => {
        console.log(exercises);
        this.dataSource.data = exercises;
      })
    );
    this.trainingService.fecthCompletedOrCanceled();
    this.subscriptions.push(
      this.uiService.loadingStateChanged.subscribe(
        loading => this.loading = loading
      )
    );
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }
}
