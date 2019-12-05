import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SadminPage } from './admin.page';

describe('AdminPage', () => {
  let component: SadminPage;
  let fixture: ComponentFixture<SadminPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SadminPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SadminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
