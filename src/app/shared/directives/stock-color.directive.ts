import { Directive, ElementRef, Input, Renderer2, effect, signal } from '@angular/core';

@Directive({
    selector: '[appStockColor]',
    standalone: true
})
export class StockColorDirective {
    @Input({ required: true }) stockValue!: number;

    private stockSignal = signal<number>(0);

    constructor(private el: ElementRef, private renderer: Renderer2) {
        effect(() => this.updateColor(this.stockSignal()));
    }

    ngOnChanges(): void {
        this.stockSignal.set(this.stockValue);
    }

    private updateColor(stock: number): void {
        // Eliminar cualquier clase previa
        this.renderer.removeClass(this.el.nativeElement, 'stock-danger');
        this.renderer.removeClass(this.el.nativeElement, 'stock-warning');
        this.renderer.removeClass(this.el.nativeElement, 'stock-normal');
        
        // Aplicar la clase según el valor del stock
        if (stock === 0) {
            this.renderer.addClass(this.el.nativeElement, 'stock-danger');
        } else if (stock > 0 && stock < 50) {
            this.renderer.addClass(this.el.nativeElement, 'stock-warning');
        } else {
            this.renderer.addClass(this.el.nativeElement, 'stock-normal');
        }
    }
}
