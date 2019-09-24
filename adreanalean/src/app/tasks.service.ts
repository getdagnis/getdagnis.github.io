
export class TasksService {
  public showNewTask = false;

  tasksToday() {
    return [
              'Lorem ipsum dolor sit amet consectetur adipisicing elit et scenum sacrit',
              'Aramet adipisicing conse actetur elit et scenum sacrit',
              'Adipisicing orem ipsum dolor sit amet consectetur adipisicing elit et scenum sacrit'
            ];
  }

  tasksLater() {
    return [
              'Later lorem ipsum dolor sit amet consectetur adipisicing elit et scenum sacrit',
              'Later aramet adipisicing conse actetur elit et scenum sacrit',
              'Later adipisicing orem ipsum dolor sit amet consectetur adipisicing elit et scenum sacrit dolor sit amet'
            ];
  }

  tasksDone() {

  }
}
