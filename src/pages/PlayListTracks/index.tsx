import React from 'react';
import styled from 'styled-components';

import PlayList from '../../components/PlayList/PlayList';
import PlayListTracksList from '../../components/TracksList/PlayListTracksList';
const Container = styled.div``;

interface Props {
  match: {
    params: {
      playListId: string;
    };
  };
}

export default function PlayListTracks(props: Props) {
  const playListId = props.match.params.playListId;
  return (
    <Container data-testid="playlist-tracks">
      <PlayList playListId={playListId} />
      <PlayListTracksList playListId={playListId} />
    </Container>
  );
}
