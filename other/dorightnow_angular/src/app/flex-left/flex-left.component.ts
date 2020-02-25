import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Task } from 'src/app/models/task.models';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-flex-left',
  templateUrl: './flex-left.component.html',
  styleUrls: ['./flex-left.component.scss']
})

export class FlexLeftComponent implements OnInit, AfterContentInit {

  listId: string;
  taskId: 'another something';
  tasksToday: Task[];
  tasksLater: Task[];

  constructor(private taskService: TaskService, private route: ActivatedRoute) {
    // this.tasksToday = taskService.getTasks('5d9266b071ea3f03d671a7ca');
    // this.tasksLater = taskService.getTasks('5d9334422d806c04d9f0f572');
  }

  onDeleteTodaysTaskClick(id: string) {
    this.taskService.deleteTask('5d9266b071ea3f03d671a7ca', id).subscribe((res: any) => {
      this.tasksToday = this.tasksToday.filter(val => val._id !== id);
      console.log(res);
    });
  }

  onDeleteLaterTaskClick(id: string) {
    this.taskService.deleteTask('5d9334422d806c04d9f0f572', id).subscribe((res: any) => {
      this.tasksLater = this.tasksLater.filter(val => val._id !== id);
      console.log(res);
    });
  }

  ngOnInit() {
  }

  ngAfterContentInit() {
    this.taskService.getTasks('5d9266b071ea3f03d671a7ca').subscribe((tasksToday: Task[]) => {
      this.tasksToday = tasksToday;
    });
    this.taskService.getTasks('5d9334422d806c04d9f0f572').subscribe((tasksLater: Task[]) => {
      this.tasksLater = tasksLater;
    });
  }

}
