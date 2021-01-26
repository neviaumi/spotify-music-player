import styled from 'styled-components';

import type { PlaylistFull } from '../../../../../hooks/spotify/typings/Playlist';
import { formatMSToMinute } from '../../../../../utils/formatMS';

interface Props {
  playList?: PlaylistFull;
}

const Container = styled.ol`
  margin: 0px;
  padding: 0px;
`;

const Item = styled.li`
  display: flex;
  justify-content: space-between;
  height: 65px;
  padding: ${props => props.theme.spaces.l} 0px;
  &:hover {
    background-color: hsla(0, 0%, 100%, 0.1);
  }
`;

const TrackInfo = styled.section`
  display: block;
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
  color: #fff;
  opacity: 0.6;
`;
const TrackAlbum = styled.a`
  color: #fff;
  opacity: 0.6;
`;

const Duration = styled.div`
  font-size: 12px;
  color: #fff;
  opacity: 0.6;
  line-height: 22px;
`;

export function TracksList({ playList }: Props) {
  return (
    <Container data-testid="track-listing">
      {playList?.tracks.items.map(playListTrack => {
        const { track } = playListTrack;
        const {
          album,
          artists: [artist],
          duration_ms,
        } = track;
        return (
          <Item key={track.id}>
            <TrackInfo>
              <TrackName>{track.name}</TrackName>
              <TrackMeta>
                <TrackAlbum>{album.name}</TrackAlbum>
                <TrackArtist>{artist.name}</TrackArtist>
              </TrackMeta>
            </TrackInfo>

            <Duration>{formatMSToMinute(duration_ms)}</Duration>
          </Item>
        );
      })}
    </Container>
  );
}
