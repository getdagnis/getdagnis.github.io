import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlexCenterComponent } from './flex-center.component';

describe('FlexCenterComponent', () => {
  let component: FlexCenterComponent;
  let fixture: ComponentFixture<FlexCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlexCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlexCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
