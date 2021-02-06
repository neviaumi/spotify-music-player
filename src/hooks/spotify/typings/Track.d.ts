import { AlbumSimplified } from './Album';
import { ArtistSimplified } from './Artist';

export interface TrackSimplified {
  album: AlbumSimplified;
  artists: ArtistSimplified[];
  available_markets?: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  href: string;
  id: string;
  is_playable?: boolean;
  name: string;
  preview_url: string | null;
  track_number: number;
  type: 'track';
  uri: string;
}

export interface TrackFull extends TrackSimplified {
  is_local?: boolean;
  popularity: number;
}
