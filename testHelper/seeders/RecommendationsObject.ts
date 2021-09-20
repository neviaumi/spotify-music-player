export function RecommendationsObject<T>(tracks?: T[]) {
  return {
    seeds: [
      {
        afterFilteringSize: 251,
        afterRelinkingSize: 251,
        href: 'https://api.spotify.com/v1/artists/3WrFJ7ztbogyGnTHbHJFl2',
        id: '3WrFJ7ztbogyGnTHbHJFl2',
        initialPoolSize: 350,
        type: 'ARTIST',
      },
      {
        afterFilteringSize: 250,
        afterRelinkingSize: 250,
        href: 'https://api.spotify.com/v1/artists/1dfeR4HaWDbWqFHLkxsg1d',
        id: '1dfeR4HaWDbWqFHLkxsg1d',
        initialPoolSize: 250,
        type: 'ARTIST',
      },
      {
        afterFilteringSize: 250,
        afterRelinkingSize: 250,
        href: 'https://api.spotify.com/v1/artists/36QJpDe2go2KgaRleHCDTp',
        id: '36QJpDe2go2KgaRleHCDTp',
        initialPoolSize: 250,
        type: 'ARTIST',
      },
      {
        afterFilteringSize: 250,
        afterRelinkingSize: 250,
        href: 'https://api.spotify.com/v1/artists/5r0xeBSRKRJ5Dm63XzTZhE',
        id: '5r0xeBSRKRJ5Dm63XzTZhE',
        initialPoolSize: 250,
        type: 'ARTIST',
      },
      {
        afterFilteringSize: 250,
        afterRelinkingSize: 250,
        href: 'https://api.spotify.com/v1/artists/22bE4uQ6baNwSHPVcDxLCe',
        id: '22bE4uQ6baNwSHPVcDxLCe',
        initialPoolSize: 250,
        type: 'ARTIST',
      },
    ],
    tracks: tracks,
  };
}
