import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from "@angular/core";

@Component({
  selector: "app-font-selector",
  templateUrl: "./font-selector.component.html",
  styleUrls: ["./font-selector.component.scss"],
})
export class FontSelectorComponent {
  @Input() design: any;

  @Output() textSelection: EventEmitter<string> = new EventEmitter<string>();

  public text: string | undefined;
  public selectedFont: string | undefined;
  public fontSize: number = 45;
  public fonts: Array<string> = ["Arial", "Verdana", "Georgia"];
  public customFontSelection: boolean = false;

  constructor() {
    this.selectedFont = this.fonts[0];
  }

  public onTextChange(event: Event): void {
    const text = (event.target as HTMLInputElement).value;
    this.textSelection.emit(text);
  }
}
