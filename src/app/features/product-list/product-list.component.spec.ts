import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { ProductService } from '../../core/services/product.service';
import { CurrencyService } from '../../core/services/currency.service';
import { RouterTestingModule } from '@angular/router/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { of } from 'rxjs';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productServiceSpy: jasmine.SpyObj<ProductService>;
  let currencyServiceSpy: jasmine.SpyObj<CurrencyService>;

  beforeEach(async () => {
    currencyServiceSpy = jasmine.createSpyObj('CurrencyService', ['currency$', 'setCurrency', 'convertAmount', 'getCurrencySymbol']);
    productServiceSpy = jasmine.createSpyObj('ProductService', ['getAllProducts', 'getProductsByCategory', 'getAllCategories']);
    productServiceSpy.getAllCategories.and.returnValue(of([]));

    currencyServiceSpy.currency$ = of('USD');

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatTableModule,
        MatPaginatorModule,
        MatInputModule,
        MatSortModule,
        MatButtonToggleModule,
        MatIconModule,
        MatButtonModule,
        ProductListComponent
      ],
      declarations: [],
      providers: [
        { provide: ProductService, useValue: productServiceSpy },
        { provide: CurrencyService, useValue: currencyServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with an empty product list', () => {
    expect(component.dataSource.data.length).toBe(0);
  });

  it('should call getAllProducts on initialization', () => {
    expect(productServiceSpy.getAllProducts).toHaveBeenCalledWith(10, 0);
  });

  it('should change currency when changeCurrency is called', () => {
    component.changeCurrency('EUR');
    expect(currencyServiceSpy.setCurrency).toHaveBeenCalledWith('EUR');
  });
});
