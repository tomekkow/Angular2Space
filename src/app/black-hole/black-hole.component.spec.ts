/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BlackHoleComponent } from './black-hole.component';

describe('BlackHoleComponent', () => {
  let component: BlackHoleComponent;
  let fixture: ComponentFixture<BlackHoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlackHoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlackHoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});