import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import useDataFetcher from '../../hooks/useDataFetcher';
import useSpotifyAPIClient from '../../hooks/useSpotifyAPIClient';
import searchPlayListsByTopArtist from '../../services/spotify/search/searchPlayListsByTopArtist';
import withSuspense from '../HOC/withSuspense';
import PresentSuggestionList from './Present/PresentSuggestionList';

export function SuggestPlayListByTopArtist() {
  const history = useHistory();
  const onClickPlayList = useCallback(
    playlist => {
      history.push(`/playlist/${playlist.id}`);
    },
    [history],
  );
  const apiClient = useSpotifyAPIClient();
  const response = useDataFetcher(['search/playlist', 'by-top-artist'], () =>
    searchPlayListsByTopArtist(apiClient),
  );

  return (
    <PresentSuggestionList
      title={`${response.data.artist?.name}`}
      suggestions={response.data.playlists}
      data-testid="playlist-by-top-artist"
      onClickSuggestion={onClickPlayList}
    />
  );
}

export default withSuspense(SuggestPlayListByTopArtist);
