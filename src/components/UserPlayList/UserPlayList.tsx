import { ComponentType, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { useUserPlayList } from '../../hooks/spotify/query/useUserPlayList';
import type { PlaylistSimplified } from '../../hooks/spotify/typings/Playlist';

export interface Props {
  onClickPlayList: (playlist: PlaylistSimplified) => void;
  playlists?: PlaylistSimplified[];
}

export function withUserPlayList(Wrapper: ComponentType<Props>) {
  return function WithUserPlayList() {
    const history = useHistory();
    const onClickPlayList = useCallback(
      playlist => {
        history.push(`/playlist/${playlist.id}`);
      },
      [history],
    );
    const response = useUserPlayList();
    return (
      <Wrapper
        onClickPlayList={onClickPlayList}
        playlists={response?.data.items}
      />
    );
  };
}

const Container = styled.section`
  margin-top: ${props => props.theme.spaces.xxl};
  padding: 0px ${props => props.theme.spaces.xl};
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.contrast4};
  font-size: ${props => props.theme.typography.size.xxs};
  line-height: 16px;
  padding-bottom: ${props => props.theme.spaces.xl};
  border-bottom: 1px solid ${props => props.theme.colors.contrast4};
`;

const ItemContainer = styled.section`
  height: 513px;
  max-width: 230px;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const Item = styled.a`
  display: block;
  text-decoration: none;
  color: ${props => props.theme.colors.contrast4};
  font-size: ${props => props.theme.typography.size.s};
  height: 32px;
  line-height: 32px;
  text-overflow: ellipsis;
  white-space: nowrap;
  &:hover {
    color: ${props => props.theme.colors.foreground};
  }
`;

export function PresentUserPlaylist({ playlists, onClickPlayList }: Props) {
  return (
    <Container>
      <Title>PLAYLISTS</Title>
      <ItemContainer>
        {playlists?.map(playlist => (
          <Item
            href=""
            key={playlist.id}
            onClick={e => {
              e.preventDefault();
              onClickPlayList(playlist);
            }}
          >
            {playlist.name}
          </Item>
        ))}
      </ItemContainer>
    </Container>
  );
}

export const UserPlayList = withUserPlayList(PresentUserPlaylist);
