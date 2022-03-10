import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudioGibliComponent } from './studio-gibli.component';

describe('StudioGibliComponent', () => {
  let component: StudioGibliComponent;
  let fixture: ComponentFixture<StudioGibliComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudioGibliComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudioGibliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
