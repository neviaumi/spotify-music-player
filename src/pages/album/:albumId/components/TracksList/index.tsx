import type { AlbumFull } from 'src/hooks/spotify/typings/Album';
import { formatMSToMinute } from 'src/utils/formatMS';
import styled from 'styled-components';

import { ReactComponent as Clock } from './clock.svg';

interface Props {
  album?: AlbumFull;
}

const Container = styled.ol`
  margin: 0px;
  padding: 0px;
`;

const Header = styled.li`
  border-bottom: 1px solid hsla(0, 0%, 100%, 0.1);
  display: grid;
  grid-gap: 16px;
  grid-template-columns: [index] 16px [first] 4fr [last] minmax(120px, 1fr);
  height: 56px;
  padding: ${props => props.theme.spaces.l} 0px;
`;

const HeaderColumn = styled.header`
  align-items: flex-end;
  color: ${props => props.theme.colors.natural255};
  display: flex;
`;

const Item = styled(Header)`
  border-bottom: none;
  &:hover {
    background-color: hsla(0, 0%, 100%, 0.1);
  }
`;

const TrackInfo = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TrackName = styled.h1`
  display: block;
  font-size: 16px;
  line-height: 22px;
  margin: 0px;
  padding: 0px;
`;

const TrackMeta = styled.aside`
  display: inline-block;
  font-size: 12px;
  line-height: 22px;
`;

const TrackArtist = styled.a`
  color: ${props => props.theme.colors.natural255};
  opacity: 0.6;
`;

const Column = styled.div`
  align-items: center;
  color: ${props => props.theme.colors.natural255};
  display: flex;
  font-size: 12px;
  line-height: 22px;
  width: 100%;
`;

export function TracksList({ album }: Props) {
  return (
    <Container data-testid="album-track-listing">
      <Header aria-label="album-track-header">
        <HeaderColumn role="columnheader">#</HeaderColumn>
        <HeaderColumn role="columnheader">Title</HeaderColumn>
        <HeaderColumn role="columnheader">
          <Clock />
        </HeaderColumn>
      </Header>
      {album?.tracks.items.map((albumTrack, index) => {
        const {
          artists: [artist],
          duration_ms,
        } = albumTrack;
        return (
          <Item aria-label="album-track" key={albumTrack.id}>
            <Column>{index + 1}</Column>
            <TrackInfo>
              <TrackName>{albumTrack.name}</TrackName>
              <TrackMeta>
                <TrackArtist>{artist.name}</TrackArtist>
              </TrackMeta>
            </TrackInfo>

            <Column>{formatMSToMinute(duration_ms)}</Column>
          </Item>
        );
      })}
    </Container>
  );
}
