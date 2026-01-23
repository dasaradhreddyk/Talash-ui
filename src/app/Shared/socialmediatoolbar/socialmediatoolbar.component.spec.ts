import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialmediatoolbarComponent } from './socialmediatoolbar.component';

describe('SocialmediatoolbarComponent', () => {
  let component: SocialmediatoolbarComponent;
  let fixture: ComponentFixture<SocialmediatoolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocialmediatoolbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocialmediatoolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
