import { path } from 'ramda';
import type { ReactNode } from 'react';
import styled from 'styled-components';

import {
  PlayerState,
  useSpotifyWebPlayback,
} from '../../contexts/SpotifyWebPlayback';
import type { Paging } from '../../hooks/spotify/typings/shared/Paging';
import type { TrackSimplified } from '../../hooks/spotify/typings/Track';
import { ReactComponent as PauseSVG } from './pause.svg';
import { ReactComponent as PlaySVG } from './play.svg';
import streamingGif from './streaming.gif';

interface ColumnDef<Item> {
  field: string[];
  headerName: string;
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderColumn?: (value: any, index: number, track: Item) => ReactNode;
  renderColumnHeader?: (
    columnsDef: ColumnDef<Item>,
    index: number,
  ) => ReactNode;
  width: string;
}

interface Props<T> {
  columns: ColumnDef<T>[];
  getTrackId: (track: T) => string;
  onPausePlayingTrack: (track: T) => void;
  onSelectTrackToPlay: (track: T) => void;
  tracks?: Paging<T>;
}

const Container = styled.ol`
  margin: 0px;
  padding: 0px;
`;

const Header = styled.li<{
  'grid-template-columns': string;
}>`
  border-bottom: 1px solid hsla(0, 0%, 100%, 0.1);
  display: grid;
  grid-gap: 16px;
  grid-template-columns: ${props => props['grid-template-columns']};
  height: 56px;
  padding: ${props => props.theme.spaces.l} 0px;
`;

export const HeaderColumn = styled.header.attrs({
  role: 'columnheader',
})<{ key: string }>`
  align-items: flex-end;
  color: ${props => props.theme.colors.natural255};
  display: flex;
`;

export const Column = styled.div<{ key: string }>`
  align-items: center;
  color: ${props => props.theme.colors.natural255};
  display: flex;
  font-size: 12px;
  line-height: 22px;
  width: 100%;
`;

const ControlToggle = styled.button`
  border: none;
  outline: none;
  display: none;
  background-color: transparent;
  padding: 0px;
  margin: 0px;
  color: ${props => props.theme.colors.white};
  max-height: 100%;
  max-width: 100%;
`;

const Index = styled.span``;

const Item = styled(Header)`
  border-bottom: none;
  &:hover {
    background-color: hsla(0, 0%, 100%, 0.1);
    ${ControlToggle} {
      display: inherit;
    }
    ${Index} {
      display: none;
    }
  }
`;

export function TracksList<T = TrackSimplified>({
  tracks,
  columns,
  getTrackId,
  onSelectTrackToPlay,
  onPausePlayingTrack,
}: Props<T>) {
  const { currentPlayingTrack, playerConnectState } = useSpotifyWebPlayback();
  const isPlayerPlaying = playerConnectState === PlayerState.PLAYING;
  const gridTemplateColumns = `[index] 16px ${columns
    .map(column => `[${column.id}] ${column.width}`)
    .join(' ')}`;
  return (
    <Container data-testid="track-listing">
      <Header
        aria-label="track-list-header"
        grid-template-columns={gridTemplateColumns}
      >
        <HeaderColumn key="index">#</HeaderColumn>
        {columns.map((column, index) =>
          column.renderColumnHeader ? (
            column.renderColumnHeader(column, index + 1)
          ) : (
            <HeaderColumn key={column.id}>{column.headerName}</HeaderColumn>
          ),
        )}
      </Header>
      {tracks?.items.map((track, index) => {
        const trackId = getTrackId(track);
        const isCurrentPlayingTrack = trackId === currentPlayingTrack?.item.id;
        return (
          <Item
            aria-label={`track-item-${index}`}
            grid-template-columns={gridTemplateColumns}
            key={trackId}
            onDoubleClick={() =>
              isCurrentPlayingTrack && isPlayerPlaying
                ? onPausePlayingTrack(track)
                : onSelectTrackToPlay(track)
            }
          >
            <Column key="column-0">
              <Index>
                {isCurrentPlayingTrack ? (
                  <img alt="streaming" src={streamingGif} />
                ) : (
                  index + 1
                )}
              </Index>
              <ControlToggle
                aria-label={`control-toggle-${index}`}
                onClick={() =>
                  isCurrentPlayingTrack && isPlayerPlaying
                    ? onPausePlayingTrack(track)
                    : onSelectTrackToPlay(track)
                }
              >
                {isCurrentPlayingTrack && isPlayerPlaying ? (
                  <PauseSVG />
                ) : (
                  <PlaySVG />
                )}
              </ControlToggle>
            </Column>
            {columns.map((column, columnIndex) => {
              const value = path(column.field, track);
              return column.renderColumn ? (
                column.renderColumn(value, columnIndex + 1, track)
              ) : (
                <Column key={column.id}>{value as string}</Column>
              );
            })}
          </Item>
        );
      })}
    </Container>
  );
}
