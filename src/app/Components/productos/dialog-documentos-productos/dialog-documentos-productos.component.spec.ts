import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDocumentosProductosComponent } from './dialog-documentos-productos.component';

describe('DialogDocumentosProductosComponent', () => {
  let component: DialogDocumentosProductosComponent;
  let fixture: ComponentFixture<DialogDocumentosProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDocumentosProductosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogDocumentosProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
