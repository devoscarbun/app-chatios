import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitComponent } from './init.component';

describe('InitComponent', () => {
  let component: InitComponent;
  let fixture: ComponentFixture<InitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
