import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUserSAComponent } from './list-user.component';

describe('ListUserComponent', () => {
  let component: ListUserSAComponent;
  let fixture: ComponentFixture<ListUserSAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListUserSAComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUserSAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
