import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditProductModalComponent } from './edit-product-modal.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReactiveFormsModule, FormBuilder, FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';

/**
 * Unit tests for EditProductModalComponent.
 *
 * Tests form initialization, validation, and dialog interactions.
 */

describe('EditProductModalComponent', () => {
    let component: EditProductModalComponent;
    let fixture: ComponentFixture<EditProductModalComponent>;
    let dialogRefSpy: jasmine.SpyObj<MatDialogRef<EditProductModalComponent>>;
    let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

    beforeEach(async () => {
        dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
        snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

        await TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                NoopAnimationsModule,
                MatFormFieldModule,
                MatInputModule,
                MatButtonModule,
                MatProgressSpinnerModule,
                EditProductModalComponent,
                CommonModule, FormsModule
            ],
            providers: [
                FormBuilder,
                { provide: MatDialogRef, useValue: dialogRefSpy },
                { provide: MatSnackBar, useValue: snackBarSpy },
                { provide: MAT_DIALOG_DATA, useValue: { product: { title: 'Producto 1', price: 100, stock: 10, description: 'Descripción del producto' } } }
            ],
            declarations: []
        }).compileComponents();

        fixture = TestBed.createComponent(EditProductModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    /**
     * Ensures the form initializes with product data.
     */
    it('should initialize the form with product data', () => {
        expect(component.productForm.value).toEqual({
            title: 'Producto 1',
            price: 100,
            stock: 10,
            description: 'Descripción del producto'
        });
    });

    /**
     * Ensures form submission is blocked if invalid.
     */
    it('should not submit form if it is invalid', () => {
        component.productForm.controls['title'].setValue('');
        component.onSubmit();
        fixture.detectChanges();
        expect(dialogRefSpy.close).not.toHaveBeenCalled();
    });

    /**
     * Ensures the dialog closes when cancel is triggered.
     */
    it('should close the dialog when cancel is called', () => {
        component.cancel();
        expect(dialogRefSpy.close).toHaveBeenCalled();
    });
});
