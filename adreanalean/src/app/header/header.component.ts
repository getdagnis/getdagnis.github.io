import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  logo: string;
  constructor() { }

  ngOnInit() {
    document.addEventListener('click', function() {
      // tslint:disable-next-line: deprecation
      switch (event.target) {
          case logo: location.reload();
                     break;
          // tslint:disable-next-line: deprecation
          default: console.log('klikšķis bija uz ' + event.target);
        }
    });
  }

}
