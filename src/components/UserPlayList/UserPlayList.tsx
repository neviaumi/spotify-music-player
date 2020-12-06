import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import withSuspense from '../../HOC/withSuspense';
import useUserPlayList from '../../hooks/spotify/query/useUserPlayList';
import type { PlaylistSimplified } from '../../hooks/spotify/typings/Playlist';

export interface Props {
  onClickPlayList: (playlist: PlaylistSimplified) => void;
  playlists?: PlaylistSimplified[];
}

export function withUserPlayList(Wrapper: React.ComponentType<Props>) {
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

export function PresentUserPlaylist({ playlists, onClickPlayList }: Props) {
  return (
    <Container>
      <Title>PLAYLISTS</Title>
      <ItemContainer>
        {playlists?.map(playlist => (
          <Item
            href=""
            key={playlist.id}
            onClick={() => onClickPlayList(playlist)}
          >
            {playlist.name}
          </Item>
        ))}
      </ItemContainer>
    </Container>
  );
}

export default withSuspense(withUserPlayList(PresentUserPlaylist));
