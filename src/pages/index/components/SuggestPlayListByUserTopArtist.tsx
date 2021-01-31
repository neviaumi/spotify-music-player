import { ComponentType, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { withSuspense } from '../../../HOC/withSuspense';
import { useSuggestedPlayListByUserTopArtist } from '../../../hooks/spotify/query/useSuggestedPlayListByUserTopArtist';
import { PresentSuggestionList, Props } from './Present/PresentSuggestionList';

export function withSuggestPlayListByUserTopArtist(
  WrappedComponent: ComponentType<Props>,
) {
  return function WithSuggestPlayListByUserTopArtist() {
    const history = useHistory();
    const onClickPlayList = useCallback(
      playlist => {
        history.push(`/playlist/${playlist.id}`);
      },
      [history],
    );
    const response = useSuggestedPlayListByUserTopArtist();

    return (
      <WrappedComponent
        data-testid="suggested-playlist-by-user-top-artist"
        onClickSuggestion={onClickPlayList}
        suggestions={response?.data.playlists}
        title={`${response?.data.artist.name}`}
      />
    );
  };
}

export const SuggestPlayListByUserTopArtist = withSuspense(
  withSuggestPlayListByUserTopArtist(PresentSuggestionList),
);
