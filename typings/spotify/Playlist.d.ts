export interface Playlist {
  collaborative: boolean;
  description: string;
  external_urls: ExternalUrls;
  followers: Followers;
  href: string;
  id: string;
  images: Image[];
  name: string;
  owner: Owner;
  primary_color: null;
  public: boolean;
  snapshot_id: string;
  tracks: Tracks;
  type: string;
  uri: string;
}

export interface ExternalUrls {
  spotify: string;
}

export interface Followers {
  href: null;
  total: number;
}

export interface Image {
  height: number | null;
  url: string;
  width: number | null;
}

export interface Owner {
  display_name?: DisplayName;
  external_urls: ExternalUrls;
  href: string;
  id: DisplayName;
  type: OwnerType;
  uri: OwnerURI;
  name?: OwnerName;
}

export enum DisplayName {
  Rafnarac = 'rafnarac',
  The1LgVvBvmQm48GExZDH322C = '1LgVvBvmQm48GExZDH322C',
}

export enum OwnerName {
  GoodKnightProductions = 'Good Knight Productions',
}

export enum OwnerType {
  Artist = 'artist',
  User = 'user',
}

export enum OwnerURI {
  SpotifyArtist1LgVvBvmQm48GExZDH322C = 'spotify:artist:1LgVvBvmQm48GExZDH322C',
  SpotifyUserRafnarac = 'spotify:user:rafnarac',
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
  added_at: Date;
  added_by: Owner;
  is_local: boolean;
  primary_color: null;
  track: Track;
  video_thumbnail: VideoThumbnail;
}

export interface Track {
  album: Album;
  artists: Owner[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  episode: boolean;
  explicit: boolean;
  external_ids: ExternalIDS;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track: boolean;
  track_number: number;
  type: TrackType;
  uri: string;
}

export interface Album {
  album_type: AlbumTypeEnum;
  artists: Owner[];
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: ID;
  images: Image[];
  name: AlbumName;
  release_date: Date;
  release_date_precision: ReleaseDatePrecision;
  total_tracks: number;
  type: AlbumTypeEnum;
  uri: AlbumURI;
}

export enum AlbumTypeEnum {
  Album = 'album',
}

export enum ID {
  The0PMBLCVSTgpQGeRvfReczF = '0PMBLCVSTgpQGeRvfReczF',
  The6ZfWCRQtaxVjptybVMFHgJ = '6zfWCrQtaxVjptybVMFHgJ',
}

export enum AlbumName {
  ATributeToDragonQuestDragonWarriorVol1 = 'A Tribute To Dragon Quest / Dragon Warrior Vol.1',
  InstrumentalCoversFromDragonQuestDragonWarrior = 'Instrumental Covers From Dragon Quest / Dragon Warrior',
}

export enum ReleaseDatePrecision {
  Day = 'day',
}

export enum AlbumURI {
  SpotifyAlbum0PMBLCVSTgpQGeRvfReczF = 'spotify:album:0PMBLCVSTgpQGeRvfReczF',
  SpotifyAlbum6ZfWCRQtaxVjptybVMFHgJ = 'spotify:album:6zfWCrQtaxVjptybVMFHgJ',
}

export interface ExternalIDS {
  isrc: string;
}

export enum TrackType {
  Track = 'track',
}

export interface VideoThumbnail {
  url: null;
}
