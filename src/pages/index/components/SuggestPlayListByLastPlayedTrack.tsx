import { ComponentType, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import withSuspense from '../../../HOC/withSuspense';
import useSuggestedPlayListByLastPlayedTrack from '../../../hooks/spotify/query/useSuggestedPlayListByLastPlayedTrack';
import PresentSuggestionList, { Props } from './Present/PresentSuggestionList';

export function withSuggestPlayListByLastPlayedTrack(
  WrappedComponent: ComponentType<Props>,
) {
  return function WithSuggestPlayListByLastPlayedTrack() {
    const history = useHistory();
    const onClickPlayList = useCallback(
      playlist => {
        history.push(`/playlist/${playlist.id}`);
      },
      [history],
    );
    const response = useSuggestedPlayListByLastPlayedTrack();

    return (
      <WrappedComponent
        data-testid="suggested-playlist-by-last-played-track"
        onClickSuggestion={onClickPlayList}
        suggestions={response?.data.playlists}
        title={`More like ${response?.data.track.name}`}
      />
    );
  };
}

export default withSuspense(
  withSuggestPlayListByLastPlayedTrack(PresentSuggestionList),
);
