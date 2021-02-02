import { ComponentType, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { withSuspense } from 'src/HOC/withSuspense';
import { useSuggestedAlbumByUserTopTracks } from 'src/hooks/spotify/query/useSuggestedAlbumByUserTopTracks';

import { PresentSuggestAlbum, Props } from './Present/PresentSuggestAlbum';

export function withSuggestAlbumByUserTopTracks(
  WrappedComponent: ComponentType<Props>,
) {
  return function WithSuggestAlbumByUserTopTracks() {
    const history = useHistory();
    const onClickAlbum = useCallback(
      album => {
        history.push(`/album/${album.id}`);
      },
      [history],
    );
    const response = useSuggestedAlbumByUserTopTracks();

    return (
      <WrappedComponent
        data-testid="suggested-album-by-user-top-tracks"
        onClickSuggestion={onClickAlbum}
        suggestions={response?.data.albums}
        title={`More like ${response?.data.tracks[0].name}`}
      />
    );
  };
}

export const SuggestAlbumByUserTopTracks = withSuspense(
  withSuggestAlbumByUserTopTracks(PresentSuggestAlbum),
);
