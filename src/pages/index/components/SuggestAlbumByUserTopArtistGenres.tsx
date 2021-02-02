import { ComponentType, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { withSuspense } from 'src/HOC/withSuspense';
import { useSuggestedAlbumByUserTopArtistGenres } from 'src/hooks/spotify/query/useSuggestedAlbumByUserTopArtistGenres';

import { PresentSuggestAlbum, Props } from './Present/PresentSuggestAlbum';

export function withSuggestAlbumByUserTopArtistGenres(
  WrappedComponent: ComponentType<Props>,
) {
  return function WithSuggestAlbumByUserTopArtistGenres() {
    const history = useHistory();
    const onClickAlbum = useCallback(
      album => {
        history.push(`/album/${album.id}`);
      },
      [history],
    );
    const response = useSuggestedAlbumByUserTopArtistGenres();

    return (
      <WrappedComponent
        data-testid="suggested-album-by-user-top-artists"
        onClickSuggestion={onClickAlbum}
        suggestions={response?.data.albums}
        title={`${response?.data.genres.slice(0, 3).join(',')} ...`}
      />
    );
  };
}

export const SuggestAlbumByUserTopArtistGenres = withSuspense(
  withSuggestAlbumByUserTopArtistGenres(PresentSuggestAlbum),
);
