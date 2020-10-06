import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form',
  styleUrls: ['./form.component.scss'],
  templateUrl: './form.component.html',
})
export class FormComponent {
  @Input() public species: any[];
  public isCollapsed = true;
}
