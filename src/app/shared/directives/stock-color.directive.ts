import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
    selector: '[appStockColor]'
})
export class StockColorDirective implements OnChanges {
    @Input() stockValue: number | undefined;

    constructor(private el: ElementRef, private renderer: Renderer2) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['stockValue'] && this.stockValue !== undefined) {
            this.updateColor();
        }
    }

    private updateColor(): void {
        if (this.stockValue! > 0) {
            this.renderer.setStyle(this.el.nativeElement, 'color', 'green');
        } else if (this.stockValue! === 0) {
            this.renderer.setStyle(this.el.nativeElement, 'color', 'orange');
        } else {
            this.renderer.setStyle(this.el.nativeElement, 'color', 'red');
        }
    }
}