import { Component, ViewChild } from '@angular/core';

import { ModalDirective } from 'ngx-bootstrap/modal';

import { faFacebook, faGithub, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-about',
  styleUrls: ['./about.component.scss'],
  templateUrl: './about.component.html',
})
export class AboutComponent {
  @ViewChild('modal', { static: false }) private modal: ModalDirective;
  public icons = { // Fontawesome icons
    faCaretRight,
    faFacebook,
    faGithub,
    faInstagram,
    faTwitter,
  };

  constructor() { }

  /**
   * Displays the component
   */
  public display(): void {
    this.modal.show();
  }

}
