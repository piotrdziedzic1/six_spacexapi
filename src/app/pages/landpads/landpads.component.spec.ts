import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandpadsComponent } from './landpads.component';

describe('LandpadsComponent', () => {
  let component: LandpadsComponent;
  let fixture: ComponentFixture<LandpadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandpadsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LandpadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
