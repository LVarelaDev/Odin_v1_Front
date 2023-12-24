import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPropietarioComponent } from './dialog-propietario.component';

describe('DialogPropietarioComponent', () => {
  let component: DialogPropietarioComponent;
  let fixture: ComponentFixture<DialogPropietarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPropietarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogPropietarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
