import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { of } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { MatGridListModule } from '@angular/material/grid-list';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '../../app-routing.module';
import { SharedModule } from '../../shared/shared.module';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productService: ProductService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductListComponent],
      imports: [ BrowserModule,
        AppRoutingModule,
        MatCardModule,
        MatButtonModule,
        MatPaginatorModule,
        BrowserAnimationsModule,
        SharedModule,
        MatGridListModule,
        MatToolbarModule,
        HttpClientModule,
        FormsModule,
        MatToolbarModule,
        MatTooltipModule,
        MatSelectModule], 
      providers: [ProductService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load products on initialization', () => {
    const products: Product[] = [{
      id: 1,
      name: 'Product 1',
      slug_url: `product-name`,
      price: 10 ,
      quantity: 1,
      promotion: false,
      imageUrl: '',
      description: '',
      addedToCart: false,
      description_full: '',
      favorite: false,
      discount: 0
    },
    {
      id: 2,
      name: 'Product 1',
      slug_url: `product-name`,
      price: 10 ,
      quantity: 1,
      promotion: false,
      imageUrl: '',
      description: '',
      addedToCart: false,
      description_full: '',
      favorite: false,
      discount: 0
    }];

    jest.spyOn(productService, 'getProducts').mockReturnValue(of(products));

    component.ngOnInit();

    expect(component.products).toEqual(products);
    expect(component.totalProducts).toBe(2);
    expect(component.currentPage).toBe(1);
    expect(component.pagedProducts).toEqual(products.slice(0, component.pageSize));
  });

  it('should add product to cart', () => {
    const product: Product = {
      id: 1,
      name: 'Product 1',
      slug_url: `product-name`,
      price: 10 ,
      quantity: 1,
      promotion: false,
      imageUrl: '',
      description: '',
      addedToCart: false,
      description_full: '',
      favorite: false,
      discount: 0
    };

    component.addToCart(product);
    expect(product.addedToCart).toBe(true);

    component.addToCart(product);
    expect(product.addedToCart).toBe(false);
  });

  it('should change page', () => {
    const products: Product[] = [];
    for (let i = 1; i <= 10; i++) {
      products.push({
        id: i,
        name: `Product ${i}`,
        slug_url: `product-${i}`, 
        price: 10 * i,
        quantity: 1,
        promotion: false,
        imageUrl: '',
        description: '',
        addedToCart: false,  
        description_full: '',
        favorite: false,
        discount: 0,
      });
    }
    component.products = products;
    component.totalProducts = 10;

    const pageEvent: PageEvent = { pageIndex: 1, pageSize: 4, length: 10 };
    component.pageChanged(pageEvent);

    expect(component.pagedProducts.length).toBe(4);
    expect(component.pagedProducts).toEqual(products.slice(4, 8));
  });

  it('should sort products by price', () => {
    const products: Product[] = [
      { id: 1, name: 'Product 1', slug_url: 'product-1', price: 20, quantity: 1, promotion: false, addedToCart: false, imageUrl: '', description: '', description_full: '', favorite: false, discount: 0 },
      { id: 2, name: 'Product 2', slug_url: 'product-2', price: 10, quantity: 1, promotion: false, addedToCart: false, imageUrl: '', description: '', description_full: '', favorite: false, discount: 0 },
      { id: 3, name: 'Product 3', slug_url: 'product-3', price: 30, quantity: 1, promotion: false, addedToCart: false, imageUrl: '', description: '', description_full: '', favorite: false, discount: 0 }
    ];
    
    component.products = products;
    component.totalProducts = products.length;
    component.currentPage = 1;
    component.pageSize = 4;
    component.setPage(component.currentPage);
    component.selectedSortOption = 'price';
    component.sortProducts();
  
    const sortedProducts = [
      { id: 2, name: 'Product 2', slug_url: 'product-2',  price: 10, quantity: 1, promotion: false, addedToCart: false, imageUrl: '', description: '', description_full: '', favorite: false, discount: 0 },
      { id: 1, name: 'Product 1', slug_url: 'product-1',  price: 20, quantity: 1, promotion: false, addedToCart: false, imageUrl: '', description: '', description_full: '', favorite: false, discount: 0 },
      { id: 3, name: 'Product 3', slug_url: 'product-3',  price: 30, quantity: 1, promotion: false, addedToCart: false, imageUrl: '', description: '', description_full: '', favorite: false, discount: 0 }
    ]; 
  
    expect(component.pagedProducts).toEqual(sortedProducts);   
  }); 

  it('should sort products by name', () => {
    const products: Product[] = [
      { id: 1, name: 'Product B', slug_url: 'product-B', price: 20, quantity: 1, promotion: false, addedToCart: false, imageUrl: '', description: '', description_full: '', favorite: false, discount: 0 },
      { id: 2, name: 'Product A', slug_url: 'product-A', price: 10, quantity: 1, promotion: false, addedToCart: false, imageUrl: '', description: '', description_full: '', favorite: false, discount: 0 },
      { id: 3, name: 'Product C', slug_url: 'product-C', price: 30, quantity: 1, promotion: false, addedToCart: false, imageUrl: '', description: '', description_full: '', favorite: false, discount: 0 }
    ];
    
    component.products = products;
    component.totalProducts = products.length;
    component.currentPage = 1;
    component.pageSize = 4;
    component.setPage(component.currentPage);
    component.selectedSortOption = 'name';
    component.sortProducts();
  
    const sortedProducts = [
      { id: 2, name: 'Product A', slug_url: 'product-A', price: 10, quantity: 1, promotion: false, addedToCart: false, imageUrl: '', description: '', description_full: '', favorite: false, discount: 0 },
      { id: 1, name: 'Product B', slug_url: 'product-B', price: 20, quantity: 1, promotion: false, addedToCart: false, imageUrl: '', description: '', description_full: '', favorite: false, discount: 0 },
      { id: 3, name: 'Product C', slug_url: 'product-C', price: 30, quantity: 1, promotion: false, addedToCart: false, imageUrl: '', description: '', description_full: '', favorite: false, discount: 0 }
    ]; 
  
    expect(component.pagedProducts).toEqual(sortedProducts);   
  });

  it('should sort products when names are equal', () => {
  const products: Product[] = [
    { id: 1, name: 'Product A', slug_url: 'product-A', price: 20, quantity: 1, promotion: false, addedToCart: false, imageUrl: '', description: '', description_full: '', favorite: false, discount: 0 },
    { id: 2, name: 'Product B', slug_url: 'product-B', price: 10, quantity: 1, promotion: false, addedToCart: false, imageUrl: '', description: '', description_full: '', favorite: false, discount: 0 },
    { id: 3, name: 'Product A', slug_url: 'product-A', price: 30, quantity: 1, promotion: false, addedToCart: false, imageUrl: '', description: '', description_full: '', favorite: false, discount: 0 }
  ];

  component.products = products;
  component.totalProducts = products.length;
  component.currentPage = 1;
  component.pageSize = 4;
  component.setPage(component.currentPage);
  component.selectedSortOption = 'name';
  component.sortProducts();

  const sortedProducts = [
    { id: 1, name: 'Product A', slug_url: 'product-A', price: 20, quantity: 1, promotion: false, addedToCart: false, imageUrl: '', description: '', description_full: '', favorite: false, discount: 0 },
    { id: 3, name: 'Product A', slug_url: 'product-A', price: 30, quantity: 1, promotion: false, addedToCart: false, imageUrl: '', description: '', description_full: '', favorite: false, discount: 0 },
    { id: 2, name: 'Product B', slug_url: 'product-B', price: 10, quantity: 1, promotion: false, addedToCart: false, imageUrl: '', description: '', description_full: '', favorite: false, discount: 0 }
  ]; 

  expect(component.pagedProducts).toEqual(sortedProducts);
});

  
  
});
