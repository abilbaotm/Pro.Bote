import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacidadComponent } from './privacidad.component';

describe('PrivacidadComponent', () => {
  let component: PrivacidadComponent;
  let fixture: ComponentFixture<PrivacidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivacidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivacidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
