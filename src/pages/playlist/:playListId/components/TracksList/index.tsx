import type { PlaylistFull } from 'src/hooks/spotify/typings/Playlist';
import { formatMSToMinute } from 'src/utils/formatMS';
import styled from 'styled-components';

import { ReactComponent as Clock } from './clock.svg';

interface Props {
  playList?: PlaylistFull;
}

const Container = styled.ol`
  margin: 0px;
  padding: 0px;
`;

const Header = styled.li`
  border-bottom: 1px solid hsla(0, 0%, 100%, 0.1);
  display: grid;
  grid-gap: 16px;
  grid-template-columns: [index] 16px [first] 6fr [var1] 4fr [var2] 3fr [last] minmax(
      120px,
      1fr
    );
  height: 56px;
  padding: ${props => props.theme.spaces.l} 0px;
`;

const HeaderColumn = styled.header`
  align-items: flex-end;
  color: ${props => props.theme.colors.natural255};
  display: flex;
  width: 100%;
`;

const Item = styled(Header)`
  border-bottom: none;
  &:hover {
    background-color: hsla(0, 0%, 100%, 0.1);
  }
`;

const TrackAlbumCover = styled.img`
  max-height: 56px;
  object-fit: cover;
  object-position: center center;
`;

const TrackInfo = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: ${props => props.theme.spaces.xl};
`;

const TrackName = styled.h1`
  color: ${props => props.theme.colors.white};
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

export function TracksList({ playList }: Props) {
  return (
    <Container data-testid="playlist-track-listing">
      <Header aria-label="playlist-track-header">
        <HeaderColumn role="columnheader">#</HeaderColumn>
        <HeaderColumn role="columnheader">TITLE</HeaderColumn>
        <HeaderColumn role="columnheader">ALBUM</HeaderColumn>
        <HeaderColumn role="columnheader">DATE ADDED</HeaderColumn>
        <HeaderColumn role="columnheader">
          <Clock />
        </HeaderColumn>
      </Header>

      {playList?.tracks.items.map((playListTrack, index) => {
        const { track } = playListTrack;
        const {
          album,
          artists: [artist],
          duration_ms,
        } = track;
        return (
          <Item aria-label="playlist-track" key={track.id}>
            <Column>{index + 1}</Column>
            <Column>
              <TrackAlbumCover
                alt={`${album.name} cover`}
                src={album.images.slice(-1).pop()?.url}
              />
              <TrackInfo>
                <TrackName>{track.name}</TrackName>
                <TrackMeta>
                  <TrackArtist>{artist.name}</TrackArtist>
                </TrackMeta>
              </TrackInfo>
            </Column>
            <Column>{album.name}</Column>
            <Column>{playListTrack.added_at}</Column>
            <Column>{formatMSToMinute(duration_ms)}</Column>
          </Item>
        );
      })}
    </Container>
  );
}
