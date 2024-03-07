import { category } from "./category";

export interface video {
  title: string;
  description: string;
  poster:File|null| string;
  links:File|null| string ;
  author?: string;
  isAvailable: boolean;
  created_at?: Date;
  updated_at?: Date;
  category: string;
}
