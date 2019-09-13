import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlexMainComponent } from './flex-main.component';

describe('FlexMainComponent', () => {
  let component: FlexMainComponent;
  let fixture: ComponentFixture<FlexMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlexMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlexMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
