import styled from 'styled-components';

import {
  Column,
  HeaderColumn,
  TracksList,
} from '../../../../../components/TracksList';
import { useSpotifyWebPlayback } from '../../../../../contexts/SpotifyWebPlayback';
import type {
  PlaylistFull,
  PlayListTrack,
} from '../../../../../hooks/spotify/typings/Playlist';
import type { TrackFull } from '../../../../../hooks/spotify/typings/Track';
import { formatMSToMinute } from '../../../../../utils/formatMS';
import Clock from './clock.svg';

interface Props {
  playList?: PlaylistFull;
}

const TrackAlbumCover = styled.img`
  max-height: 56px;
  object-fit: cover;
  object-position: center center;
`;

const TrackInfo = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: ${props => props.theme.spaces.m};
`;

const TrackName = styled.h1`
  color: ${props => props.theme.colors.foreground};
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

export function PlayListTracksList({ playList }: Props) {
  const {
    actions: { playTrackOnUserPlayback, pauseUserPlayback },
  } = useSpotifyWebPlayback();

  return (
    <TracksList<PlayListTrack>
      columns={[
        {
          field: ['track'],
          headerName: 'TITLE',
          id: 'title',
          renderColumn: function TitleColumn(track: TrackFull) {
            const {
              album,
              artists: [artist],
            } = track;
            return (
              <Column key="title">
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
            );
          },
          width: '6fr',
        },
        {
          field: ['track', 'album', 'name'],
          headerName: 'ALBUM',
          id: 'album',
          width: '4fr',
        },
        {
          field: ['added_at'],
          headerName: 'DATE ADDED',
          id: 'date-added',
          width: '3fr',
        },
        {
          field: ['track', 'duration_ms'],
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
      getTrackId={track => track.track.id}
      onPausePlayingTrack={() => pauseUserPlayback()}
      onSelectTrackToPlay={track => playTrackOnUserPlayback(track.track)}
      tracks={playList?.tracks}
    />
  );
}
