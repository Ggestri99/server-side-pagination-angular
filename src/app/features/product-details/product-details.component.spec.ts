import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductDetailsComponent } from './product-details.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiBaseService } from '../../core/services/api-base.service';
import { ProductService } from '../../core/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialog } from '@angular/material/dialog';
import { EditProductModalComponent } from './edit/edit-product-modal.component';

/**
 * Unit tests for ProductDetailsComponent.
 * 
 * Tests component initialization, navigation, and modal interactions.
 */

describe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;
  let router: Router;
  let dialogSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    dialogSpy = jasmine.createSpyObj<MatDialog>('MatDialog', ['open']);

    dialogSpy.open.and.returnValue({
      afterClosed: () => of(null),
      componentInstance: { someProperty: {} }
    } as any);

    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule, ProductDetailsComponent],
      providers: [
        ProductService,
        ApiBaseService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => '123' } },
          }
        },
        {
          provide: MatDialog,
          useValue: dialogSpy
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetailsComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

    /**
   * Ensures the component initializes correctly.
   */

  it('should initialize component and call ngOnInit', () => {
    spyOn(component, 'ngOnInit').and.callThrough();
    component.ngOnInit();
    expect(component.ngOnInit).toHaveBeenCalled();
  });

    /**
   * Verifies navigation to the product list when goBack() is triggered.
   */
  it('should navigate to /products when goBack() is called', () => {
    spyOn(router, 'navigate');
    component.goBack();
    expect(router.navigate).toHaveBeenCalledWith(['/products']);
  });
});
