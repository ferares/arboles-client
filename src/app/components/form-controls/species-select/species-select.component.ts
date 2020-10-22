import { AfterViewInit, Component, forwardRef, Input, OnChanges, SimpleChanges, ViewChildren } from '@angular/core';
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
export class SpeciesSelectComponent implements ControlValueAccessor, OnChanges, AfterViewInit {
  @ViewChildren('dropdownMenu') private dropdownMenu;
  @Input() public elements: any[]; // Select dropdown options
  private searchInput;
  public search = '';
  public filteredElements: any[]; // Select dropdown options filtered
  public value: any; // Selected value
  public label: string; // Selected label
  public disabled: boolean;
  public onChanged: any = () => {};
  public onTouched: any = () => {};

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.elements) {
      // Make the filtered elements the same as the elements
      this.filteredElements = this.elements;
    }
  }

  public ngAfterViewInit(): void {
    // When the dropdown opens for the first time it's children appear on the DOM
    this.dropdownMenu.changes.subscribe((elements) => {
      // Save a reference to the search input for future use
      this.searchInput = elements.first.nativeElement.firstChild.firstChild;
      // Focus on the search input
      this.searchInput.focus();
    });
  }

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

  /**
   * Focus on the search input
   */
  public setFocus(): void {
    // If the search input has been set...
    if (this.searchInput) {
      // ...focus on it
      this.searchInput.focus();
    }
  }

  /**
   * Filter the elements to display
   */
  public filter(): void {
    // Get the search term
    const searchTerm = this.search.toLowerCase();
    // Filter the elements
    this.filteredElements = this.elements.filter((element) => {
      return (
        element.nombre_cientifico === 'Todas' || // Always include the "all" species element
        element.nombre_comun.toLowerCase().includes(searchTerm) ||
        element.nombre_cientifico.toLowerCase().includes(searchTerm)
      );
    });
  }

}
