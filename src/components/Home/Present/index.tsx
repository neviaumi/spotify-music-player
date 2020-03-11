import React from 'react';
import styled from 'styled-components';

interface Props {
  title: string;
  playlists?: Spotify.Playlist[];
}

const PlayListContainer = styled.p`
  padding: ${props => props.theme.spaces.xl} 0;
`;

const Container = styled.div`
  display: flex;
  max-width: 100%;
  overflow: scroll;
`;

const Heading = styled.h1`
  font-size: 28px;
  line-height: 1.6;
  display: block;
`;

const Item = styled.a`
  display: block;
  width: 164px;
  min-width: 164px;
  padding: ${props => props.theme.spaces.xxl};
  ${props => props.theme.spaces.xxl};
  ${props => props.theme.spaces.xl};
  background: #282828;
  border-radius: 8px;
  margin-right: ${props => props.theme.spaces.xl};
`;

const PlayListIcon = styled.img`
  width: 100%;
  display: block;
  margin-bottom: ${props => props.theme.spaces.xl};
`;

const PlayListBottom = styled.div`
  height: 62px;
  overflow: hidden;
`;

const PlayListName = styled.p`
  font-size: 14px;
  line-height: 20px;
  font-weight: 700;
  letter-spacing: 0.24px;
`;

const PlayListDescription = styled.span`
  display: block;
  font-size: 12px;
  line-height: 18px;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${props => props.theme.colors.grey};
  margin-top: ${props => props.theme.spaces.s};
  overflow: hidden;
`;

export default ({ title, playlists = [] }: Props) => {
  return (
    <PlayListContainer data-testid="present-play-list">
      <Heading>{title}</Heading>
      <Container>
        {playlists.map(playlist => (
          <Item key={playlist.id} data-testid="present-play-list-item">
            <PlayListIcon src={playlist.images[0].url} />
            <PlayListBottom>
              <PlayListName>{playlist.name}</PlayListName>
              <PlayListDescription>{playlist.description}</PlayListDescription>
            </PlayListBottom>
          </Item>
        ))}
      </Container>
    </PlayListContainer>
  );
};
