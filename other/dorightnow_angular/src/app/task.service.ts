import { Task } from 'src/app/models/task.models';
import { WebRequestService } from './web-request.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  doRightNow = false;

  constructor(private webReqService: WebRequestService) { }

  // pievieno listi datubāzei ar create list pogu
  createList(title: string) {
    // nosūtām web requestu uz web-request.service, lai izveidotu jaunu listi
    return this.webReqService.post('lists', { title });
  }

  createTask(title: string, listId: string) {
    return this.webReqService.post(`lists/${listId}/tasks`, { title });
  }

  // padod visu listu sarakstu task-view komponentei atrādīšanai
  getLists() {
    return this.webReqService.get('lists');
  }

  getTasks(listId: string) {
    return this.webReqService.get(`lists/${listId}/tasks`);
  }

  getTask(listId: string, taskId: string) {
    return this.webReqService.get(`lists/${listId}/tasks/${taskId}`);
  }

  complete(task: Task) {
    return this.webReqService.patch(`lists/${task._listId}/tasks/${task._id}`, {
      completed: !task.completed
    });
  }

  deleteTask(listId: string, taskId: string) {
    return this.webReqService.delete(`lists/${listId}/tasks/${taskId}`);
  }

  updateTask(listId: string, taskId: string, title: string) {
    // We want to send a web request to update a list
    return this.webReqService.patch(`lists/${listId}/tasks/${taskId}`, { title });
  }

}



