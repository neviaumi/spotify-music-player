import { path } from 'ramda';
import type { ReactNode } from 'react';
import styled from 'styled-components';

import type { Paging } from '../../hooks/spotify/typings/shared/Paging';
import type { TrackSimplified } from '../../hooks/spotify/typings/Track';

interface ColumnDef<Item> {
  field: string[];
  headerName: string;
  id: string;
  renderColumn?: (value: any, index: number, track: Item) => ReactNode;
  renderColumnHeader?: (
    columnsDef: ColumnDef<Item>,
    index: number,
  ) => ReactNode;
  width: string;
}

interface Props<T> {
  columns: ColumnDef<T>[];
  rowId: (track: T) => string;
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
})`
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

export const Column = styled.div`
  align-items: center;
  color: ${props => props.theme.colors.natural255};
  display: flex;
  font-size: 12px;
  line-height: 22px;
  width: 100%;
`;

export function TracksList<T = TrackSimplified>({
  tracks,
  columns,
  rowId,
}: Props<T>) {
  const gridTemplateColumns = columns
    .map(column => `[${column.id}] ${column.width}`)
    .join(' ');
  return (
    <Container data-testid="track-listing">
      <Header
        aria-label="track-list-header"
        grid-template-columns={gridTemplateColumns}
      >
        {columns.map((column, index) =>
          column.renderColumnHeader ? (
            column.renderColumnHeader(column, index)
          ) : (
            <HeaderColumn key={column.id}>{column.headerName}</HeaderColumn>
          ),
        )}
      </Header>
      {tracks?.items.map((track, index) => {
        return (
          <Item
            aria-label="track-item"
            grid-template-columns={gridTemplateColumns}
            key={rowId(track)}
          >
            {columns.map(column => {
              const value = path(column.field, track);
              return column.renderColumn ? (
                column.renderColumn(value, index, track)
              ) : (
                <Column>{value as string}</Column>
              );
            })}
          </Item>
        );
      })}
    </Container>
  );
}
