import { ComponentType, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useSuggestedAlbumByUserLastPlayedArtists } from 'src/hooks/spotify/query/useSuggestedAlbumByUserLastPlayedArtists';

import { PresentSuggestAlbum, Props } from './Present/PresentSuggestAlbum';

export function withSuggestAlbumByUserLastPlayedArtists(
  WrappedComponent: ComponentType<Props>,
) {
  return function WithSuggestAlbumByUserLastPlayedArtists() {
    const history = useHistory();
    const onClickAlbum = useCallback(
      album => {
        history.push(`/album/${album.id}`);
      },
      [history],
    );
    const response = useSuggestedAlbumByUserLastPlayedArtists();

    return (
      <WrappedComponent
        data-testid="suggested-album-by-last-played-artists"
        onClickSuggestion={onClickAlbum}
        suggestions={response?.data.albums}
        title={`Continue with ${response?.data.artists[0].name}`}
      />
    );
  };
}

export const SuggestAlbumByUserLastPlayedArtists = withSuggestAlbumByUserLastPlayedArtists(
  PresentSuggestAlbum,
);
