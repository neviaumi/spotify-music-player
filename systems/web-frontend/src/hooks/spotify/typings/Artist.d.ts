import { Image } from './shared/Image';

export interface ArtistSimplified {
  href: string;
  id: string;
  name: string;
  type: 'artist';
  uri: string;
}

export interface ArtistFull extends ArtistSimplified {
  followers: { total: number };
  genres: string[];

  images: Image[];

  popularity: number;
}
