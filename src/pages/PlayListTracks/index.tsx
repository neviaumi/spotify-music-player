import React from 'react';
import styled from 'styled-components';
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
      <div>Page should display track under playlistId : {playListId}</div>
    </Container>
  );
}
