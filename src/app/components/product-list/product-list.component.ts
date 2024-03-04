import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  
  products: Product[] = [];
  pagedProducts: Product[] = [];
  totalProducts: number = 0;
  currentPage: number = 1;
  pageSize: number = 4; 
  selectedSortOption: string = 'price';  

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
      this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe((data: any) => {
      this.products = data;
      this.totalProducts = this.products.length;
      this.setPage(1);
      this.sortProducts(); // Adiciona a chamada para classificar os produtos após o carregamento
    });
  }

  setPage(page: number) {
    this.currentPage = page;
    const startIndex = (page - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.totalProducts); 
    this.pagedProducts = this.products.slice(startIndex, endIndex);
} 

  addToCart(product: Product) {
      
    if(!product?.addedToCart || !product.addedToCart)
      product.addedToCart = true;
    else
      product.addedToCart = false;
      
  }

  pageChanged(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    this.pagedProducts = this.products.slice(startIndex, startIndex + event.pageSize);
  }
  
  sortProducts() {
    if (this.selectedSortOption === 'price') {
      this.pagedProducts.sort((a, b) => a.price - b.price);
    } else if (this.selectedSortOption === 'name') {
      this.pagedProducts.sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    } 
  }

}

