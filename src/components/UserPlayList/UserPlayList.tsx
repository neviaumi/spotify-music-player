import React from 'react';
import styled from 'styled-components';

import useDataFetcher from '../../hooks/useDataFetcher';
import useSpotifyAPIClient from '../../hooks/useSpotifyAPIClient';
import getAllPlaylist, {
  Response,
} from '../../services/spotify/playlist/getAllPlaylist';
import withSuspense from '../HOC/withSuspense';

const Container = styled.section`
  margin-top: 24px;
  padding: 0px 24px;
`;

const Title = styled.h1`
  color: #b3b3b3;
  font-size: 11px;
  line-height: 16px;
  padding-bottom: 24px;
  border-bottom: 1px solid ${props => props.theme.colors.natural255};
`;

const ItemContainer = styled.section`
  height: 513px;
  max-width: 230px;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const Item = styled.a`
  display: block;
  color: ${props => props.theme.colors.natural255};
  font-size: 14px;
  height: 32px;
  line-height: 32px;
  text-overflow: ellipsis;
  white-space: nowrap;
  &:hover {
    color: ${props => props.theme.colors.white};
  }
`;

export function Playlist() {
  const apiClient = useSpotifyAPIClient();
  const response = useDataFetcher<Response>('me/playlists', () =>
    getAllPlaylist(apiClient),
  );
  const playlists = response.data.items ?? [];
  return (
    <Container>
      <Title>PLAYLISTS</Title>
      <ItemContainer>
        {playlists.map(playlist => (
          <Item data-testid="user-playlist" key={playlist.id}>
            {playlist.name}
          </Item>
        ))}
      </ItemContainer>
    </Container>
  );
}

export default withSuspense(Playlist);
