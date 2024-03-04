import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { Product } from '../models/product';

describe('ProductService', () => {
  let service: ProductService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [ProductService]
    });
    service = TestBed.inject(ProductService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); 
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return products', () => {
    const mockProducts: Product[] = [
      { 
        id: 1, 
        name: 'Product 1', 
        price: 10,
        slug_url: 'product-1',
        quantity: 100,
        promotion: false,
        imageUrl: 'https://example.com/product1.jpg',
        description: 'Descrição do Produto 1',
        description_full: 'Descrição completa do Produto 1',
        favorite: false
      },
      { 
        id: 2, 
        name: 'Product 2', 
        price: 20,
        slug_url: 'product-2',
        quantity: 50,
        promotion: true,
        imageUrl: 'https://example.com/product2.jpg',
        description: 'Descrição do Produto 2',
        description_full: 'Descrição completa do Produto 2',
        favorite: true
      }
    ];    

    service.getProducts().subscribe(products => {
      expect(products).toEqual(mockProducts);
    });

    const req = httpTestingController.expectOne('assets/data/products.json');
    expect(req.request.method).toEqual('GET');

    req.flush(mockProducts);
  });
});
