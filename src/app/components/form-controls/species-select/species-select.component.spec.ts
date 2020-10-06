import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeciesSelectComponent } from './species-select.component';

describe('SpeciesSelectComponent', () => {
  let component: SpeciesSelectComponent;
  let fixture: ComponentFixture<SpeciesSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeciesSelectComponent ]
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
