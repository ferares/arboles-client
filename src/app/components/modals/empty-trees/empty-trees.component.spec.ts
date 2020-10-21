import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyTrees } from './empty-trees.component';

describe('EmptyTrees', () => {
  let component: EmptyTrees;
  let fixture: ComponentFixture<EmptyTrees>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmptyTrees ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyTrees);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
