import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  providers: [{
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SpeciesSelectComponent),
  }],
  selector: 'app-species-select',
  styleUrls: ['./species-select.component.scss'],
  templateUrl: './species-select.component.html',
})
export class SpeciesSelectComponent implements ControlValueAccessor {
  @Input() public elements: any[]; // Select dropdown options
  public value: any; // Selected value
  public label: string; // Selected label
  public disabled: boolean;
  public onChanged: any = () => {};
  public onTouched: any = () => {};

  public writeValue(value: any): void {
    for (const element of this.elements) {
      if (element.id === value) {
        this.label = element.nombre_cientifico;
        break;
      }
    }
    this.value = value;
  }

  public registerOnChange(fn: any): void {
    this.onChanged = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  /**
   * Select an element
   * @param value - Value of the selected element
   * @param label - Label of the selected element
   */
  public select(value, label): void {
    this.value = value;
    this.label = label;
    this.onTouched();
    this.onChanged(this.value);
  }

}
