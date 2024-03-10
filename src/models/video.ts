

export interface Video {
  _id?:number,
  slug?: string,
  title: string;
  description: string;
  poster:File|Blob|null|string;
  links:File|null| Blob|string ;
  author?: string;
  PosterLink?:string,
  VideoLink?: string,
  isAvailable: boolean;
  created_at?: Date;
  updated_at?: Date;
  category: string;
}
