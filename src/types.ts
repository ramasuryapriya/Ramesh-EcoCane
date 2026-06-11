export interface ProductVariant {
  unit: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  category: 'food' | 'eco';
  subcategory: string;
  price: number;
  unit: string;
  description: string;
  image: string;
  benefits: string[];
  highlights?: string[];
  rating: number;
  reviewsCount: number;
  isBestSeller?: boolean;
  isNew?: boolean;
  inStock: boolean;
  imagePrompt?: string;
  variants?: ProductVariant[];
}

export type SubscriptionFrequency = 'weekly' | 'biweekly' | 'monthly';

export interface CartItem {
  product: Product;
  quantity: number;
  isSubscription?: boolean;
  subscriptionFrequency?: SubscriptionFrequency;
}

export interface B2BInquiry {
  name: string;
  email: string;
  phone: string;
  companyName: string;
  category: 'jaggery_bulk' | 'eco_wholesale' | 'both';
  expectedVolume: string;
  message: string;
}

export interface UserReview {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  productName: string;
}
