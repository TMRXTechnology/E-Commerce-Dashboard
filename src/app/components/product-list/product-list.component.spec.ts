import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { ProductService } from '../../services/product.service';
import { of } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { AppComponent } from '../../app.component';
import { SharedModule } from '../../shared/shared.module';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productService: ProductService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductListComponent],
      imports: [
        MatCardModule,
        MatButtonModule,
        MatPaginatorModule,
        MatToolbarModule,
        HttpClientModule,
        CommonModule,
        SharedModule,
        BrowserAnimationsModule
      ],
      providers: [
        ProductService,HttpClient],
      
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
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
    const products = [{
      "id": 3,
      "name": "Teclado Mecânico",
      "slug_url": "teclado-mecanico",
      "price": 49.99,
      "quantity": 5,
      "promotion": false,
      "addedToCart": false,
      "imageUrl": "caminho/para/imagem3.jpg",
      "description": "Um teclado mecânico com resposta tátil e rápida.",
      "description_full": "Este teclado mecânico oferece uma experiência de digitação excepcional, com resposta tátil e rápida. Ideal para gamers e digitadores rápidos.",
      "favorite": false
    }];
    spyOn(productService, 'getProducts').and.returnValue(of(products));
    component.ngOnInit();
    expect(component.products).toEqual(products);
    expect(component.totalProducts).toBe(products.length);
    expect(component.currentPage).toBe(1);
    expect(component.pagedProducts).toEqual(products.slice(0, component.pageSize));
  });

  it('should add product to cart', () => {
    const product = {
      "id": 3,
      "name": "Teclado Mecânico",
      "slug_url": "teclado-mecanico",
      "price": 49.99,
      "quantity": 5,
      "promotion": false,
      "addedToCart": false,
      "imageUrl": "caminho/para/imagem3.jpg",
      "description": "Um teclado mecânico com resposta tátil e rápida.",
      "description_full": "Este teclado mecânico oferece uma experiência de digitação excepcional, com resposta tátil e rápida. Ideal para gamers e digitadores rápidos.",
      "favorite": false
    };
    component.addToCart(product);
    expect(product.addedToCart).toBe(true);
    component.addToCart(product);
    expect(product.addedToCart).toBe(false);
  });

  it('should change page', () => {
    const products = [{
      "id": 3,
      "name": "Teclado Mecânico",
      "slug_url": "teclado-mecanico",
      "price": 49.99,
      "quantity": 5,
      "promotion": false,
      "addedToCart": false,
      "imageUrl": "caminho/para/imagem3.jpg",
      "description": "Um teclado mecânico com resposta tátil e rápida.",
      "description_full": "Este teclado mecânico oferece uma experiência de digitação excepcional, com resposta tátil e rápida. Ideal para gamers e digitadores rápidos.",
      "favorite": false
    }];
    component.products = products;
    component.totalProducts = products.length;
    const pageEvent: PageEvent = { pageIndex: 1, pageSize: 10, length: products.length };
    component.pageChanged(pageEvent);
    expect(component.pagedProducts).toEqual([]);
  });
});
