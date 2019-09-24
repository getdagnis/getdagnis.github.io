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
    const taskText = document.getElementById('task-text');
    taskText.focus();
    document.addEventListener('keyup', (event: any) => {
      if (event.keyCode === 13) {
        console.log('Enter key was pressed!');
      }
    })
  }

  ngOnInit() {
  }

  ngAfterContentInit() {
    // this.winIsLoaded = false;
    // const leftSide = document.querySelector('#flex-side-in-left');
    // setTimeout(() => {
    //   this.initial = leftSide.innerHTML;
    //   leftSide.innerHTML = '';
    // this.winIsLoaded = true;
    // }, 0);
    // setTimeout(() => {
    //   leftSide.innerHTML = this.initial;
    // }, 200);
  }

}
