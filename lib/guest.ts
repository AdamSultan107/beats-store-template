// Handle guest ID generation and retrieval
export function getOrGenerateGuestId(): string {
  if (typeof window === "undefined") return "";

  const KEY = "shadx2_guest_id";
  let id = localStorage.getItem(KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(KEY, id);
  }
  return id;
}