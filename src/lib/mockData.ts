export interface Product {
  id: string;
  barcode: string;
  name: string;
  price: number;
  weight: number; // in grams
  image: string;
  stock: number;
}

export const initialProducts: Product[] = [
  {
    id: "1",
    barcode: "8901234567890",
    name: "Classic Milk Chocolate",
    price: 45,
    weight: 100,
    image: "https://images.unsplash.com/photo-1581795669633-91b77ad1805d?w=400&h=400&fit=crop",
    stock: 50,
  },
  {
    id: "2",
    barcode: "8901234567891",
    name: "Organic Green Tea",
    price: 250,
    weight: 250,
    image: "https://images.unsplash.com/photo-1523920290228-4f321a939b4c?w=400&h=400&fit=crop",
    stock: 30,
  },
  {
    id: "3",
    barcode: "8901234567892",
    name: "Whole Wheat Bread",
    price: 40,
    weight: 400,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop",
    stock: 20,
  },
  {
    id: "4",
    barcode: "8901234567893",
    name: "Fresh Apple (1kg)",
    price: 180,
    weight: 1000,
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6bcd6?w=400&h=400&fit=crop",
    stock: 100,
  },
];
