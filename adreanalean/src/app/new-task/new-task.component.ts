import { TasksService } from './../tasks.service';
// import { CurrentAppState } from './../app.component';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {
  showNewTask: any;

  constructor(service: TasksService) {
    this.showNewTask = service.showNewTask;
  }

 pickColor() {
      document.addEventListener('click', (event: any) => {
          const myColor = event.target;
          const allColors = document.getElementsByClassName('pick-color');
          let i: any;

          if (myColor.classList.contains('pick-color') === true) {
              for (i = 0; i < allColors.length; i++) {
                  allColors[i].classList.remove('active-color');
              }
              myColor.classList.add('active-color');
          }
      });
  }

hideNewTaskPopup() {
    const taskWrap = document.getElementById('task-wrapper');
    taskWrap.style.display = 'none';
  }

ngOnInit() {
    console.log('showNewTask is currently: ' + this.showNewTask);
  }

}
