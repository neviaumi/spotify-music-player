import { ComponentType, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import withSuspense from '../../../HOC/withSuspense';
import useSuggestedPlayListByLastPlayedArtist from '../../../hooks/spotify/query/useSuggestedPlayListByLastPlayedArtist';
import PresentSuggestionList, { Props } from './Present/PresentSuggestionList';

export function withSuggestPlayListByLastPlayedArtist(
  WrappedComponent: ComponentType<Props>,
) {
  return function WithSuggestPlayListByLastPlayedArtist() {
    const history = useHistory();
    const onClickPlayList = useCallback(
      playlist => {
        history.push(`/playlist/${playlist.id}`);
      },
      [history],
    );
    const response = useSuggestedPlayListByLastPlayedArtist();

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

export default withSuspense(
  withSuggestPlayListByLastPlayedArtist(PresentSuggestionList),
);
