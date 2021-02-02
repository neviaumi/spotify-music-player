import type { ComponentType } from 'react';
import { useParams } from 'react-router-dom';
import { withSuspense } from 'src/HOC/withSuspense';
import { usePlayList } from 'src/hooks/spotify/query/usePlayList';
import type { PlaylistFull } from 'src/hooks/spotify/typings/Playlist';
import styled from 'styled-components';

import { Heading } from './components/Heading';
import { TracksList } from './components/TracksList';

const Container = styled.div`
  padding: 0 32px;
`;

export function withPlayList(
  Wrapper: ComponentType<{
    playList?: PlaylistFull;
  }>,
) {
  return function WithPlayList() {
    const { playListId } = useParams<{
      playListId: string;
    }>();
    const response = usePlayList(playListId);
    return <Wrapper playList={response?.data} />;
  };
}

export function PresentPlayList({ playList }: { playList?: PlaylistFull }) {
  return (
    <Container>
      <Heading playList={playList} />
      <TracksList playList={playList} />
    </Container>
  );
}

export const PlayerListPage = withSuspense(withPlayList(PresentPlayList));
