import { ComponentType, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { withSuspense } from 'src/HOC/withSuspense';
import { useTopStreamingAlbum } from 'src/hooks/spotify/query/useTopStreamingAlbum';
import type { AlbumSimplified } from 'src/hooks/spotify/typings/Album';

import { PresentSuggestAlbum, Props } from './Present/PresentSuggestAlbum';

export function withAlbumByTopStreamTracks(
  WrappedComponent: ComponentType<Props>,
) {
  return function WithAlbumByTopStreamTracks() {
    const history = useHistory();
    const onClickAlbum = useCallback(
      (album: AlbumSimplified) => {
        history.push(`/album/${album.id}`);
      },
      [history],
    );
    const response = useTopStreamingAlbum();

    return (
      <WrappedComponent
        data-testid="suggested-album-by-top-stream-tracks"
        onClickSuggestion={onClickAlbum}
        suggestions={response?.data.albums}
        title={`Top streaming album in ${response?.data.userCountry}`}
      />
    );
  };
}

export const AlbumByTopStreamTracks = withSuspense(
  withAlbumByTopStreamTracks(PresentSuggestAlbum),
);
