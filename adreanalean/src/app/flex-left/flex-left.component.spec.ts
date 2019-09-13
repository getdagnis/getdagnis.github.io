import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlexLeftComponent } from './flex-left.component';

describe('FlexLeftComponent', () => {
  let component: FlexLeftComponent;
  let fixture: ComponentFixture<FlexLeftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlexLeftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlexLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
