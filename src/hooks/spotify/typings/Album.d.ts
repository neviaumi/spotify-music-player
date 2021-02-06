import { ArtistSimplified } from './Artist';
import { Image } from './shared/Image';
import { Paging } from './shared/Paging';
import { TrackSimplified } from './Track';

export interface AlbumSimplified {
  album_group?: 'album' | 'single' | 'compilation' | 'appears_on';
  album_type: 'album' | 'single' | 'compilation';
  artists: ArtistSimplified[];
  available_markets?: string[];
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: 'year' | 'month' | 'day';
  total_tracks: number;
  type: 'album';
  uri: string;
}

export interface AlbumFull extends AlbumSimplified {
  genres: string[];

  label: string;

  popularity: number;

  tracks: Paging<TrackSimplified>;
}
