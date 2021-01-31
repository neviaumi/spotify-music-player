import { ComponentType, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { withSuspense } from '../../../HOC/withSuspense';
import { useSuggestedPlayListByUserLastPlayedArtist } from '../../../hooks/spotify/query/useSuggestedPlayListByUserLastPlayedArtist';
import { PresentSuggestionList, Props } from './Present/PresentSuggestionList';

export function withSuggestPlayListByUserLastPlayedArtist(
  WrappedComponent: ComponentType<Props>,
) {
  return function WithSuggestPlayListByUserLastPlayedArtist() {
    const history = useHistory();
    const onClickPlayList = useCallback(
      playlist => {
        history.push(`/playlist/${playlist.id}`);
      },
      [history],
    );
    const response = useSuggestedPlayListByUserLastPlayedArtist();

    return (
      <WrappedComponent
        data-testid="suggested-playlist-by-last-played-artist"
        onClickSuggestion={onClickPlayList}
        suggestions={response?.data.playlists}
        title={`Continue with ${response?.data.artist.name}`}
      />
    );
  };
}

export const SuggestPlayListByUserLastPlayedArtist = withSuspense(
  withSuggestPlayListByUserLastPlayedArtist(PresentSuggestionList),
);
