import type { ComponentType } from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { ErrorFallback } from '../../../components/ErrorFallback';
import { withSuspense } from '../../../components/Suspense/withSuspense';
import { usePlayList } from '../../../hooks/spotify/query/usePlayList';
import type { PlaylistFull } from '../../../hooks/spotify/typings/Playlist';
import { Heading } from './components/Heading';
import { PlayListTracksList } from './components/TracksList';

interface Props {
  playList?: PlaylistFull;
}

const Container = styled.div`
  height: 100%;
  padding: 0 ${props => props.theme.spaces.xxxl};
`;

export function withPlayList(Wrapper: ComponentType<Props>) {
  return function WithPlayList() {
    const { playlistId } = useParams<{
      playlistId: string;
    }>();
    const response = usePlayList(playlistId);
    return <Wrapper playList={response?.data} />;
  };
}

export function PresentPlayList({ playList }: Props) {
  return (
    <Container data-testid="/playlist/:playlistId">
      <Heading playList={playList} />
      <PlayListTracksList playList={playList} />
    </Container>
  );
}

export const PlaylistPage = withErrorBoundary<Props>(
  withSuspense(withPlayList(PresentPlayList)),
  {
    FallbackComponent: ErrorFallback,
  },
);
