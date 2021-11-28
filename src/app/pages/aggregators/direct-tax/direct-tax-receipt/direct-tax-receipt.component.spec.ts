import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectTaxReceiptComponent } from './direct-tax-receipt.component';

describe('DirectTaxReceiptComponent', () => {
  let component: DirectTaxReceiptComponent;
  let fixture: ComponentFixture<DirectTaxReceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectTaxReceiptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectTaxReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
