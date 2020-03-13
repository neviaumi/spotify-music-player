export interface Album {
  album_type: string;
  artists: Artist[];
  available_markets: AvailableMarket[];
  copyrights: Copyright[];
  external_ids: ExternalIDS;
  external_urls: ExternalUrls;
  genres: any[];
  href: string;
  id: string;
  images: Image[];
  label: string;
  name: string;
  popularity: number;
  release_date: Date;
  release_date_precision: string;
  total_tracks: number;
  tracks: Tracks;
  type: string;
  uri: string;
}

export interface Artist {
  external_urls: ExternalUrls;
  href: string;
  id: ID;
  name: Name;
  type: ArtistType;
  uri: URI;
}

export interface ExternalUrls {
  spotify: string;
}

export enum ID {
  The5R0XeBSRKRJ5Dm63XzTZhE = '5r0xeBSRKRJ5Dm63XzTZhE',
}

export enum Name {
  EndyChow = 'Endy Chow',
}

export enum ArtistType {
  Artist = 'artist',
}

export enum URI {
  SpotifyArtist5R0XeBSRKRJ5Dm63XzTZhE = 'spotify:artist:5r0xeBSRKRJ5Dm63XzTZhE',
}

export enum AvailableMarket {
  Hk = 'HK',
}

export interface Copyright {
  text: string;
  type: string;
}

export interface ExternalIDS {
  upc: string;
}

export interface Image {
  height: number;
  url: string;
  width: number;
}

export interface Tracks {
  href: string;
  items: Item[];
  limit: number;
  next: null;
  offset: number;
  previous: null;
  total: number;
}

export interface Item {
  artists: Artist[];
  available_markets: AvailableMarket[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  preview_url: string;
  track_number: number;
  type: ItemType;
  uri: string;
}

export enum ItemType {
  Track = 'track',
}
