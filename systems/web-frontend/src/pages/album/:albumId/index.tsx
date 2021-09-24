import type { ComponentType } from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { ErrorFallback } from '../../../components/ErrorFallback';
import { withSuspense } from '../../../components/Suspense/withSuspense';
import { useAlbum } from '../../../hooks/spotify/query/useAlbum';
import type { AlbumFull } from '../../../hooks/spotify/typings/Album';
import { Heading } from './components/Heading';
import { AlbumTracksList } from './components/TracksList';

const Container = styled.div`
  height: 100%;
  padding: 0 ${props => props.theme.spaces.xxxl};
`;

interface Props {
  album?: AlbumFull;
}

export function withAlbum(Wrapper: ComponentType<Props>) {
  return function WithAlbum() {
    const { albumId } = useParams<{
      albumId: string;
    }>();
    const response = useAlbum(albumId);
    return <Wrapper album={response?.data} />;
  };
}

export function PresentAlbum({ album }: Props) {
  return (
    <Container data-testid="/album/:albumId">
      <Heading album={album} />
      <AlbumTracksList album={album} />
    </Container>
  );
}

export const AlbumPage = withErrorBoundary<Props>(
  withSuspense<Props>(withAlbum(PresentAlbum)),
  {
    FallbackComponent: ErrorFallback,
  },
);
