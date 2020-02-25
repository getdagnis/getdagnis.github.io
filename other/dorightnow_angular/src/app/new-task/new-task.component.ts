import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { Task } from 'src/app/models/task.models';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {
  showNewTask: any;
  listId: string;

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) { }

  createTaskToday(title: string) {
    this.listId = '5d9266b071ea3f03d671a7ca';
    this.taskService.createTask(title, this.listId).subscribe((newTask: Task) => {
      this.router.navigate([ '../my-app' ], { relativeTo: this.route });
    });
  }

  createTaskLater(title: string) {
    this.listId = '5d9334422d806c04d9f0f572';
    this.taskService.createTask(title, this.listId).subscribe((newTask: Task) => {
      this.router.navigate([ '../my-app' ], { relativeTo: this.route });
    });
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
  }

}
