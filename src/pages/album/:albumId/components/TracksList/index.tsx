import { Column, HeaderColumn, TracksList } from 'src/components/TracksList';
import type { AlbumFull } from 'src/hooks/spotify/typings/Album';
import type { TrackSimplified } from 'src/hooks/spotify/typings/Track';
import { formatMSToMinute } from 'src/utils/formatMS';
import styled from 'styled-components';

import { useSpotifyWebPlayback } from '../../../../../contexts/SpotifyWebPlayback';
import { ReactComponent as Clock } from './clock.svg';

interface Props {
  album?: AlbumFull;
}

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

export function AlbumTracksList({ album }: Props) {
  const {
    data: { playTrackOnUserPlayback, pauseUserPlayback },
  } = useSpotifyWebPlayback();

  return (
    <TracksList<TrackSimplified>
      columns={[
        {
          field: [],
          headerName: 'Title',
          id: 'title',
          renderColumn: function TitleColumn(track: TrackSimplified) {
            const {
              name,
              artists: [artist],
            } = track;
            return (
              <TrackInfo key="title">
                <TrackName>{name}</TrackName>
                <TrackMeta>
                  <TrackArtist>{artist.name}</TrackArtist>
                </TrackMeta>
              </TrackInfo>
            );
          },
          width: '4fr',
        },
        {
          field: ['duration_ms'],
          headerName: '',
          id: 'duration',
          renderColumn: function DurationColumn(value: number) {
            return <Column key="duration">{formatMSToMinute(value)}</Column>;
          },
          renderColumnHeader: function DurationHeader() {
            return (
              <HeaderColumn key="duration">
                <Clock />
              </HeaderColumn>
            );
          },
          width: 'minmax(120px, 1fr)',
        },
      ]}
      getTrackId={track => track.id}
      onPausePlayingTrack={() => pauseUserPlayback()}
      onSelectTrackToPlay={track => playTrackOnUserPlayback(track)}
      tracks={album?.tracks}
    />
  );
}
