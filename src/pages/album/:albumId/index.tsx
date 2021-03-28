import type { ComponentType } from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { useParams } from 'react-router-dom';
import { withSuspense } from 'src/components/Suspense/withSuspense';
import { useAlbum } from 'src/hooks/spotify/query/useAlbum';
import type { AlbumFull } from 'src/hooks/spotify/typings/Album';
import styled from 'styled-components';

import { ErrorFallback } from '../../../components/ErrorFallback';
import { Heading } from './components/Heading';
import { AlbumTracksList } from './components/TracksList';

const Container = styled.div`
  padding: 0 ${props => props.theme.spaces.xxxl};
  height: 100%;
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
