import type { ComponentType } from 'react';
import { useParams } from 'react-router-dom';
import { withSuspense } from 'src/HOC/withSuspense';
import { useAlbum } from 'src/hooks/spotify/query/useAlbum';
import type { AlbumFull } from 'src/hooks/spotify/typings/Album';
import styled from 'styled-components';

import { Heading } from './components/Heading';
import { TracksList } from './components/TracksList';

const Container = styled.div`
  padding: 0 32px;
`;

export function withAlbum(
  Wrapper: ComponentType<{
    album?: AlbumFull;
  }>,
) {
  return function WithAlbum() {
    const { albumId } = useParams<{
      albumId: string;
    }>();
    const response = useAlbum(albumId);
    return <Wrapper album={response?.data} />;
  };
}

export function PresentAlbum({ album }: { album?: AlbumFull }) {
  return (
    <Container>
      <Heading album={album} />
      <TracksList album={album} />
    </Container>
  );
}

export const AlbumPage = withSuspense(withAlbum(PresentAlbum));
