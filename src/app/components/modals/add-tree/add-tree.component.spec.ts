import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTree } from './add-tree.component';

describe('AddTree', () => {
  let component: AddTree;
  let fixture: ComponentFixture<AddTree>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTree ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTree);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
