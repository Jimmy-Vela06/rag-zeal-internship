import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZealComponent } from './zeal.component';

describe('ZealComponent', () => {
  let component: ZealComponent;
  let fixture: ComponentFixture<ZealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZealComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
