import type { ComponentType } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import withSuspense from '../../../HOC/withSuspense';
import usePlayList from '../../../hooks/spotify/query/usePlayList';
import type { PlaylistFull } from '../../../hooks/spotify/typings/Playlist';
import { Heading } from './components/Heading';
import TracksList from './components/TracksList';

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

export default withSuspense(withPlayList(PresentPlayList));
