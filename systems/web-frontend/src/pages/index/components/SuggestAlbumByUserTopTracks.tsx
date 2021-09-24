import { ComponentType, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { useSpotifyWebPlayback } from '../../../contexts/SpotifyWebPlayback';
import { useSuggestedAlbumByUserTopTracks } from '../../../hooks/spotify/query/useSuggestedAlbumByUserTopTracks';
import { PresentSuggestAlbum, Props } from './Present/PresentSuggestAlbum';

export function withSuggestAlbumByUserTopTracks(
  WrappedComponent: ComponentType<Props>,
) {
  return function WithSuggestAlbumByUserTopTracks() {
    const history = useHistory();
    const { actions } = useSpotifyWebPlayback();
    const onClickToggleButton = useCallback(
      album => {
        actions.playOnUserPlayback({
          context_uri: album.uri,
          offset: { position: 0 },
        });
      },
      [actions],
    );
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
        onClickToggleButton={onClickToggleButton}
        suggestions={response?.data.albums}
        title={`More like ${response?.data.tracks[0].name}`}
      />
    );
  };
}

export const SuggestAlbumByUserTopTracks =
  withSuggestAlbumByUserTopTracks(PresentSuggestAlbum);
