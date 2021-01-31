import { ComponentType, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { withSuspense } from '../../../HOC/withSuspense';
import { useSuggestedPlayListByUserLastPlayedTrack } from '../../../hooks/spotify/query/useSuggestedPlayListByUserLastPlayedTrack';
import {
  PresentSuggestPlayList,
  Props,
} from './Present/PresentSuggestPlayList';

export function withSuggestPlayListByUserLastPlayedTrack(
  WrappedComponent: ComponentType<Props>,
) {
  return function WithSuggestPlayListByUserLastPlayedTrack() {
    const history = useHistory();
    const onClickPlayList = useCallback(
      playlist => {
        history.push(`/playlist/${playlist.id}`);
      },
      [history],
    );
    const response = useSuggestedPlayListByUserLastPlayedTrack();

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

export const SuggestPlayListByUserLastPlayedTrack = withSuspense(
  withSuggestPlayListByUserLastPlayedTrack(PresentSuggestPlayList),
);
