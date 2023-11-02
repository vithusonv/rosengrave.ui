import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizeItemComponent } from './customize-item.component';

describe('CustomizeItemComponent', () => {
  let component: CustomizeItemComponent;
  let fixture: ComponentFixture<CustomizeItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomizeItemComponent]
    });
    fixture = TestBed.createComponent(CustomizeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
