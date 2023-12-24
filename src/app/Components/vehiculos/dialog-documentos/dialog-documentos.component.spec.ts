import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDocumentosComponent } from './dialog-documentosVehiculos.component';

describe('DialogDocumentosComponent', () => {
  let component: DialogDocumentosComponent;
  let fixture: ComponentFixture<DialogDocumentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDocumentosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogDocumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
