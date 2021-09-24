import styled from 'styled-components';

import {
  Column,
  HeaderColumn,
  TracksList,
} from '../../../../../components/TracksList';
import { useSpotifyWebPlayback } from '../../../../../contexts/SpotifyWebPlayback';
import type { AlbumFull } from '../../../../../hooks/spotify/typings/Album';
import type { TrackSimplified } from '../../../../../hooks/spotify/typings/Track';
import { formatMSToMinute } from '../../../../../utils/formatMS';
import Clock from './clock.svg';

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
  font-size: ${props => props.theme.typography.size.m};
  line-height: 22px;
  margin: 0px;
  padding: 0px;
`;

const TrackMeta = styled.aside`
  display: inline-block;
  font-size: ${props => props.theme.typography.size.xs};
  line-height: 22px;
`;

const TrackArtist = styled.a`
  color: ${props => props.theme.colors.contrast4};
  opacity: 0.6;
`;

export function AlbumTracksList({ album }: Props) {
  const {
    actions: { playTrackOnUserPlayback, pauseUserPlayback },
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
