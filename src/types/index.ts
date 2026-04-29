export interface CartItem {
  productId: string;
  title: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  imageUrl: string | null;
  category: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string | null;
  role: "USER" | "ADMIN";
}
