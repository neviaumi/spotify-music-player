import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import useDataFetcher from '../../hooks/useDataFetcher';
import useSpotifyAPIClient from '../../hooks/useSpotifyAPIClient';
import searchPlayListByLastPlayedArtist from '../../services/spotify/search/searchPlayListByLastPlayedArtist';
import withSuspense from '../HOC/withSuspense';
import PresentSuggestionList from './Present/PresentSuggestionList';

export function SuggestPlayListByLastPlayedArtist() {
  const history = useHistory();
  const onClickPlayList = useCallback(
    playlist => {
      history.push(`/playlist/${playlist.id}`);
    },
    [history],
  );
  const apiClient = useSpotifyAPIClient();
  const response = useDataFetcher(
    ['search/playlist', 'by-last-played-artist'],
    () => searchPlayListByLastPlayedArtist(apiClient),
  );

  return (
    <PresentSuggestionList
      title={`Continue with ${response.data.artist?.name}`}
      suggestions={response.data.playlists}
      data-testid="playlist-by-last-played-artist"
      onClickSuggestion={onClickPlayList}
    />
  );
}

export default withSuspense(SuggestPlayListByLastPlayedArtist);
