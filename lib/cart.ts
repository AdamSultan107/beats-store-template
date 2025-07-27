// lib/cart.ts

import supabase from './supabaseClient';
import { getOrGenerateGuestId } from './guest';

// Add an item to the cart
export async function addToCart(kitId: string, quantity = 1) {
  const guestId = getOrGenerateGuestId();

  const { data, error } = await supabase.from('cart_items').insert([
    {
      kit_id: kitId,
      quantity,
      guest_id: guestId,
    },
  ]);

  if (error) {
    console.error('Insert error:', error);
    return { success: false, error };
  }

  return { success: true, data };
}

// Fetch all cart items for the current guest
export async function fetchCartItems() {
  const guestId = getOrGenerateGuestId();

  const { data, error } = await supabase
    .from('cart_items')
    .select('id, kit_id, quantity, kits(name, price)')
    .eq('guest_id', guestId);

  if (error) {
    console.error('Fetch error:', error);
    return [];
  }

  return data;
}

// Remove one item from the cart
export async function removeCartItem(itemId: string) {
  const guestId = getOrGenerateGuestId();

  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('id', itemId)
    .eq('guest_id', guestId);

  if (error) {
    console.error('Delete error:', error);
    return false;
  }

  return true;
}
