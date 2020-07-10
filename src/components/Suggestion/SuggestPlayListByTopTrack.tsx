import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import useDataFetcher from '../../hooks/useDataFetcher';
import useSpotifyAPIClient from '../../hooks/useSpotifyAPIClient';
import searchPlayListsByTopTrack from '../../services/spotify/search/searchPlayListsByTopTrack';
import withSuspense from '../HOC/withSuspense';
import PresentSuggestionList from './Present/PresentSuggestionList';

export function SuggestPlayListByTopTrack() {
  const history = useHistory();
  const onClickPlayList = useCallback(
    playlist => {
      history.push(`/playlist/${playlist.id}`);
    },
    [history],
  );
  const apiClient = useSpotifyAPIClient();
  const response = useDataFetcher(['search/playlist', 'by-top-track'], () =>
    searchPlayListsByTopTrack(apiClient),
  );

  return (
    <PresentSuggestionList
      title={`More like ${response.data.track?.name}`}
      suggestions={response.data.playlists}
      data-testid="playlist-by-top-track"
      onClickSuggestion={onClickPlayList}
    />
  );
}

export default withSuspense(SuggestPlayListByTopTrack);
