
export class FunctionsService {
  dblClickCount = 0;
  dblClickHappened() {
    console.log('Double click just happened on a dblclick class element!');
    this.dblClickCount++;
    console.log(this.dblClickCount);
  }

  listenToKeys() {
    document.addEventListener('keyup', (event: any) => {
      switch (event.code) {
        case 'KeyN': console.log('N taustiņš nospiests');
                     this.showNewTaskPopup();
                     break;
        default: console.log(event.code);
                 break;
      }
  });
  }

  showNewTaskPopup() {
    const taskWrap = document.getElementById('task-wrapper');
    taskWrap.style.display = 'block';
    const taskText = document.getElementById('task-text');
    taskText.focus();
  }

}
