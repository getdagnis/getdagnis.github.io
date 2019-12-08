import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flex-main',
  templateUrl: './flex-main.component.html',
  styleUrls: ['./flex-main.component.scss']
})
export class FlexMainComponent implements OnInit {
  hiddenLeft = false;
  hiddenRight = false;

  showOrHide(side: string) {
    const flexLeft = document.getElementById('flex-left');
    const flexRight = document.getElementById('flex-right');
    const thisArrow = 'arr-' + side;
    const btnArrow = document.getElementById(thisArrow);
    const thisClass = 'slide-side-' + side;

    if (side === 'left') {
      if (this.hiddenLeft === false) {
          flexLeft.classList.add(thisClass);
          btnArrow.classList.add('rotate-180');
          this.hiddenLeft = true;
      } else if (this.hiddenLeft === true) {
          flexLeft.classList.remove(thisClass);
          btnArrow.classList.remove('rotate-180');
          this.hiddenLeft = false;
      }
    }

    if (side === 'right') {
      if (this.hiddenRight === false) {
          flexRight.classList.add(thisClass);
          btnArrow.classList.add('rotate-180');
          this.hiddenRight = true;
      } else if (this.hiddenRight === true) {
          flexRight.classList.remove(thisClass);
          btnArrow.classList.remove('rotate-180');
          this.hiddenRight = false;
      }
    }
  }

  constructor() { }

  ngOnInit() {
  }

}
