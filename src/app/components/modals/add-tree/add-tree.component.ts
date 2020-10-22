import { Component, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { ModalDirective } from 'ngx-bootstrap/modal';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-add-tree',
  styleUrls: ['./add-tree.component.scss'],
  templateUrl: './add-tree.component.html',
})
export class AddTreeComponent {
  @ViewChild('modal', { static: false }) private modal: ModalDirective;
  public googleFormUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    this.googleFormUrl = this.sanitizer.bypassSecurityTrustResourceUrl(environment.googleFormUrl);
  }

  /**
   * Displays the component
   */
  public display(): void {
    this.modal.show();
  }

}
