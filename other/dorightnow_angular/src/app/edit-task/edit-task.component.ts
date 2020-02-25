import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { Task } from 'src/app/models/task.models';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {
  showNewTask: any;
  listId: string;
  thisTaskId: string;
  thisTask: Task[];

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) {
    this.thisTaskId = route.snapshot.url[1].path;
    console.log(this.thisTaskId);
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


ngOnInit() {
    this.taskService.getTask('5d9266b071ea3f03d671a7ca', this.thisTaskId).subscribe((thisTask: Task[]) => {
      this.thisTask = thisTask;
    });
  }

  updateTodayTask(title: string) {
    this.taskService.updateTask('5d9266b071ea3f03d671a7ca', this.thisTaskId, title).subscribe(() => {
      this.router.navigate(['../my-app']);
    })
  }

}
