

export interface video {
  _id?:number,
  title: string;
  description: string;
  poster:File|Blob|null|string;
  links:File|null| Blob|string ;
  author?: string;
  isAvailable: boolean;
  created_at?: Date;
  updated_at?: Date;
  category: string;
}
