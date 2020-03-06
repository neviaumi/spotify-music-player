import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  height: 513px;
`;

interface Props {
  items: Spotify.Playlist[];
}

export default function Playlist({ items = [] }: Props) {
  return (
    <Container>
      {items.map(item => (
        <div data-testid="user-playlist" key={item.id}>
          {item.name}
        </div>
      ))}
    </Container>
  );
}
