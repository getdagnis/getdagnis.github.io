import { TasksService } from './../tasks.service';
import { Component, OnInit, AfterContentInit } from '@angular/core';

@Component({
  selector: 'app-flex-left',
  templateUrl: './flex-left.component.html',
  styleUrls: ['./flex-left.component.scss']
})

export class FlexLeftComponent implements OnInit, AfterContentInit {

  tasksToday: any;
  tasksLater: any;
  initial: any;

  constructor(service: TasksService) {
    this.tasksToday = service.tasksToday();
    this.tasksLater = service.tasksLater();
  }

  showNewTaskPopup() {
    const taskWrap = document.getElementById('task-wrapper');
    taskWrap.style.display = 'block';
    const taskText = document.getElementById('taskBody');
    taskText.focus();
  }

  ngOnInit() {
    console.log(this.tasksToday);
  }

  ngAfterContentInit() {

  }

}
