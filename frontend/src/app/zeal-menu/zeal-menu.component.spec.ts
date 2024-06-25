import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZealMenuComponent } from './zeal-menu.component';

describe('ZealMenuComponent', () => {
  let component: ZealMenuComponent;
  let fixture: ComponentFixture<ZealMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZealMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZealMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
