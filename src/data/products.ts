import { Product } from '@/context/CartContext';
import ring1 from '@/assets/ring1.jpg';
import ring2 from '@/assets/ring2.jpg';
import necklace1 from '@/assets/necklace1.jpg';
import necklace2 from '@/assets/necklace2.jpg';
import earrings1 from '@/assets/earrings1.jpg';
import earrings2 from '@/assets/earrings2.jpg';
import bracelet1 from '@/assets/bracelet1.jpg';

export const products: Product[] = [
  {
    id: '1',
    name: 'Diamond Solitaire Ring',
    category: 'Rings',
    price: 2499,
    discountPrice: 1999,
    discountPercent: 20,
    images: [ring1, ring2],
    description: 'Exquisite 18K gold diamond solitaire ring with brilliant cut diamond',
    inStock: true,
  },
  {
    id: '2',
    name: 'Ruby Elegance Ring',
    category: 'Rings',
    price: 1899,
    images: [ring2, ring1],
    description: 'Stunning 18K gold ruby ring with accent diamonds',
    inStock: true,
  },
  {
    id: '3',
    name: 'Gemstone Pendant Necklace',
    category: 'Necklaces',
    price: 1799,
    discountPrice: 1349,
    discountPercent: 25,
    images: [necklace1, necklace2],
    description: 'Beautiful 18K gold pendant necklace with precious gemstone',
    inStock: true,
  },
  {
    id: '4',
    name: 'Pearl Cascade Necklace',
    category: 'Necklaces',
    price: 2199,
    images: [necklace2, necklace1],
    description: 'Elegant 18K gold pearl necklace with lustrous pearls',
    inStock: false,
  },
  {
    id: '5',
    name: 'Diamond Stud Earrings',
    category: 'Earrings',
    price: 1499,
    discountPrice: 1199,
    discountPercent: 20,
    images: [earrings1, earrings2],
    description: 'Classic 18K gold diamond stud earrings with brilliant cut diamonds',
    inStock: true,
  },
  {
    id: '6',
    name: 'Diamond Hoop Earrings',
    category: 'Earrings',
    price: 1899,
    images: [earrings2, earrings1],
    description: 'Luxurious 18K gold hoop earrings adorned with diamonds',
    inStock: true,
  },
  {
    id: '7',
    name: 'Tennis Bracelet',
    category: 'Bracelets',
    price: 3299,
    discountPrice: 2639,
    discountPercent: 20,
    images: [bracelet1, bracelet1],
    description: 'Timeless 18K gold tennis bracelet with brilliant diamonds',
    inStock: true,
  },
  {
    id: '8',
    name: 'Classic Diamond Ring',
    category: 'Rings',
    price: 2899,
    images: [ring1, ring2],
    description: 'Sophisticated 18K gold ring with flawless diamond centerpiece',
    inStock: true,
  },
];

export const categories = ['All', 'Rings', 'Necklaces', 'Earrings', 'Bracelets'];
