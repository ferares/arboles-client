import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { faFacebookF, faFacebookSquare, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faExternalLinkAlt, faLink, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

import { environment } from '../../../../environments/environment';

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
  public icons = {
    faExternalLinkAlt,
    faFacebookF,
    faFacebookSquare,
    faInstagram,
    faLink,
    faMapMarkerAlt,
    faTwitter,
  };
  private streetviewUrl = `https://www.google.com/maps/embed/v1/streetview?heading=210&pitch=10&fov=35&key=${environment.googleMapsAPIKey}&location=`;

  constructor(private apiService: ApiService, private sanitizer: DomSanitizer) { }

  public ngOnChanges(changes: SimpleChanges): void {
    if ((changes.treeId) && (changes.treeId.currentValue)) {
      this.apiService.getTree(this.treeId).subscribe((tree) => {
        if (!tree.streetview) {
          tree.streetview = `${this.streetviewUrl}${tree.lat},${tree.lng}`;
        }
        tree.streetview = this.sanitizer.bypassSecurityTrustResourceUrl(tree.streetview);
        this.tree = tree;
        this.display = true;
      });
    }
  }

}
