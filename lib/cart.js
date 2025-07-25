import { supabase } from './supabaseClient';

// Get or create a guest user ID
export function getUserId() {
  let id = localStorage.getItem('shadx2_guest_id');
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem('shadx2_guest_id', id);
  }
  return id;
}

// Add a kit to the cart
export async function addToCart(kitId, quantity = 1) {
  const userId = getUserId();

  const { data, error } = await supabase
    .from('cart_items')
    .upsert([{ user_id: userId, kit_id: kitId, quantity }], {
      onConflict: ['user_id', 'kit_id'],
    });

  if (error) {
    console.error('addToCart error:', error.message);
  }

  return data;
}

// Remove a kit from the cart
export async function removeFromCart(kitId) {
  const userId = getUserId();

  const { error } = await supabase
    .from('cart_items')
    .delete()
    .match({ user_id: userId, kit_id: kitId });

  if (error) {
    console.error('removeFromCart error:', error.message);
  }
}

// Get all cart items (with kit info)
export async function getCartItems() {
  const userId = getUserId();

  const { data, error } = await supabase
    .from('cart_items')
    .select('id, quantity, kit_id (id, name, price, image_url)')
    .eq('user_id', userId);

  if (error) {
    console.error('getCartItems error:', error.message);
  }

  return data || [];
}

// (Optional) Clear the cart completely
export async function clearCart() {
  const userId = getUserId();

  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('user_id', userId);

  if (error) {
    console.error('clearCart error:', error.message);
  }
}
