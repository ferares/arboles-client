import { Component, ViewChild } from '@angular/core';

import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-empty-trees',
  styleUrls: ['./empty-trees.component.scss'],
  templateUrl: './empty-trees.component.html',
})
export class EmptyTreesComponent {
  @ViewChild('modal', { static: false }) private modal: ModalDirective;

  constructor() { }

  /**
   * Displays the component
   */
  public display(): void {
    this.modal.show();
  }

}
