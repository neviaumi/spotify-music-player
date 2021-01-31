import { ComponentType, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { withSuspense } from '../../../HOC/withSuspense';
import { useTopStreamingAlbum } from '../../../hooks/spotify/query/useTopStreamingAlbum';
import type { AlbumSimplified } from '../../../hooks/spotify/typings/Album';
import { PresentSuggestAlbum, Props } from './Present/PresentSuggestAlbum';

export function withSuggestAlbumBySpotifyTopStreamTracks(
  WrappedComponent: ComponentType<Props>,
) {
  return function WithSuggestAlbumBySpotifyTopStreamTracks() {
    const history = useHistory();
    const onClickPlayList = useCallback(
      (album: AlbumSimplified) => {
        history.push(`/album/${album.id}`);
      },
      [history],
    );
    const response = useTopStreamingAlbum();

    return (
      <WrappedComponent
        data-testid="suggested-album-by-top-stream-tracks"
        onClickSuggestion={onClickPlayList}
        suggestions={response?.data.albums}
        title={`Top streaming album in ${response?.data.userCountry}`}
      />
    );
  };
}

export const SuggestAlbumBySpotifyTopStreamTracks = withSuspense(
  withSuggestAlbumBySpotifyTopStreamTracks(PresentSuggestAlbum),
);
