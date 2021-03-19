import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SpeciesSelectComponent } from './species-select.component';

describe('SpeciesSelectComponent', () => {
  let component: SpeciesSelectComponent;
  let fixture: ComponentFixture<SpeciesSelectComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeciesSelectComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeciesSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
