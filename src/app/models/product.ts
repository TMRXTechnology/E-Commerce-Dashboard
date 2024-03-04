export interface Product {
    id: number;
    name: string;
    slug_url: string;
    price: number;
    quantity: number;
    promotion: boolean;
    imageUrl: string;
    description: string;
    addedToCart?: boolean;
    description_full: string;
    favorite: boolean;
    discount: number;
  }
  