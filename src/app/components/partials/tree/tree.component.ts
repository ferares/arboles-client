import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-tree',
  styleUrls: ['./tree.component.scss'],
  templateUrl: './tree.component.html',
})
export class TreeComponent implements OnChanges {
  @Input() public treeId: number;
  public tree;
  public display = false;

  constructor(private apiService: ApiService) { }

  public ngOnChanges(changes: SimpleChanges): void {
    if ((changes.treeId) && (changes.treeId.currentValue)) {
      this.apiService.getTree(this.treeId).subscribe((tree) => {
        this.tree = tree;
        this.display = true;
      });
    }
  }

}
