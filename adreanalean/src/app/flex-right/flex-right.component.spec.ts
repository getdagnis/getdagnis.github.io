import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlexRightComponent } from './flex-right.component';

describe('FlexRightComponent', () => {
  let component: FlexRightComponent;
  let fixture: ComponentFixture<FlexRightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlexRightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlexRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
