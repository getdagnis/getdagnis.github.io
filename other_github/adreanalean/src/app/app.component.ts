import { FunctionsService } from './functions.service';
import { Component, AfterContentInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // host: {
  //   (document:click) => onclick()   <<< piemērs, kā būtu pareizi taisīt eventu angularā
  // }
})

export class AppComponent {
  title = 'adrenalean';
  dblClickHappened: any;



  constructor(service: FunctionsService) {
    document.addEventListener('dblclick', (event: any) => {
      const e = event.target.classList.contains('dblclick');
      if (e === true) {
          service.dblClickHappened();
        }
    });
    service.listenToKeys();
  }

}
