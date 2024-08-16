export interface Guest {
  id: string;
  author: string;
  message: string;
  image: string | null;
}

export interface GuestMutation {
  author: string;
  message: string;
  image: File | null;
}