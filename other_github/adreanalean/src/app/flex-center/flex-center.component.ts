import { Router, ActivatedRoute } from '@angular/router';
import { TaskService } from 'src/app/task.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flex-center',
  templateUrl: './flex-center.component.html',
  styleUrls: ['./flex-center.component.scss']
})
export class FlexCenterComponent implements OnInit {

  doRightNow: boolean;

  constructor(private taskService: TaskService, private route: ActivatedRoute) {

  }

  ngOnInit() {
  }

}
