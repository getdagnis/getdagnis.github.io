import { FunctionsService } from './functions.service';
import { Component, AfterContentInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'addrenalin';
  dblClickHappened: any;

  constructor(service: FunctionsService) {
    document.addEventListener('dblclick', (event: any) => {
      const e = event.target.classList.contains('dblclick');
      if (e === true) {
          service.dblClickHappened();
        }
    });
  }

}
