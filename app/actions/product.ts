'use server';

import { products, categories } from '@/lib/data';

export async function getProducts() {
  return products;
}

export async function getCategories() {
  return categories;
}

// Stubs for admin actions (not used in public build)
export async function createCategoryAction() {
  throw new Error('Admin action not available');
}

export async function createProductAction() {
  throw new Error('Admin action not available');
}
