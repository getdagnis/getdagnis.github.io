
export class TasksService {
  public showNewTask = false;

  // TODO: izveidot funkciju, kas padot NewTask vērtību un katru reizi, kad tā tiek izsaukta, to nomaina

  tasksToday() {
    return [
      {id: '1', cathegory: 'cath-a', body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit et scenum sacrit', doing: '0'},
      {id: '4', cathegory: 'cath-a', body: 'Lorem ipsum dolor', doing: '0'},
      {id: '2', cathegory: 'cath-a', body: 'Aramet adipisicing conse actetur elit et scenum sacrit', doing: '0'},
      // tslint:disable-next-line: max-line-length
      {id: '3', cathegory: 'cath-a', body: 'Adipisicing orem ipsum dolor sit amet consectetur adipisicing elit et scenum sacrit', doing: '0'},
    ];
  }

  tasksLater() {
    return [
      {id: '2', cathegory: 'cath-a', body: 'Aramet adipisicing conse actetur elit et scenum sacrit', doing: '0'},
      // tslint:disable-next-line: max-line-length
      {id: '3', cathegory: 'cath-a', body: 'Adipisicing orem ipsum dolor sit amet consectetur adipisicing elit et scenum sacrit', doing: '0'},
      {id: '4', cathegory: 'cath-a', body: 'Lorem ipsum dolor', doing: '0'}
    ];
  }

  tasksDone() {
    return [
      {id: '1', cathegory: 'cath-a', body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit et scenum sacrit', doing: '0', time:'7120'},
      {id: '2', cathegory: 'cath-a', body: 'Aramet adipisicing conse actetur elit et scenum sacrit', doing: '0'},
      // tslint:disable-next-line: max-line-length
      {id: '3', cathegory: 'cath-a', body: 'Adipisicing orem ipsum dolor sit amet consectetur adipisicing elit et scenum sacrit', doing: '0'},
      {id: '4', cathegory: 'cath-a', body: 'Lorem ipsum dolor', doing: '0'}
    ];
  }
}
