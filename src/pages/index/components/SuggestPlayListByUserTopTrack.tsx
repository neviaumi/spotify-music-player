import { ComponentType, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { withSuspense } from '../../../HOC/withSuspense';
import { useSuggestedPlayListByUserTopTrack } from '../../../hooks/spotify/query/useSuggestedPlayListByUserTopTrack';
import {
  PresentSuggestPlayList,
  Props,
} from './Present/PresentSuggestPlayList';

export function withSuggestPlayListByUserTopTrack(
  WrappedComponent: ComponentType<Props>,
) {
  return function WithSuggestPlayListByUserTopTrack() {
    const history = useHistory();
    const onClickPlayList = useCallback(
      playlist => {
        history.push(`/playlist/${playlist.id}`);
      },
      [history],
    );
    const response = useSuggestedPlayListByUserTopTrack();

    return (
      <WrappedComponent
        data-testid="suggested-playlist-by-user-top-track"
        onClickSuggestion={onClickPlayList}
        suggestions={response?.data.playlists}
        title={`More like ${response?.data.track?.name}`}
      />
    );
  };
}

export const SuggestPlayListByUserTopTrack = withSuspense(
  withSuggestPlayListByUserTopTrack(PresentSuggestPlayList),
);
