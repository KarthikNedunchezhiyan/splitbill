import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatorComponent } from './updator.component';

describe('UpdatorComponent', () => {
  let component: UpdatorComponent;
  let fixture: ComponentFixture<UpdatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
