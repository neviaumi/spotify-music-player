import React from 'react';
import styled from 'styled-components';

import type { PlaylistFull } from '../../../../../hooks/spotify/typings/Playlist';
import formatMS from '../../../../../utils/formatMS';
import getTrackListTotalDuration from '../../../../../utils/getTrackListTotalDuration';

interface Props {
  playList?: PlaylistFull;
}

const Container = styled.section`
  display: flex;
  align-items: flex-end;
`;

const ContentContainer = styled.main`
  margin-left: 24px;
`;

const Title = styled.h1`
  font-size: 48px;
  line-height: 48px;
  margin: 0px;
  padding: ${props => props.theme.spaces.l} 0px;
`;

const Type = styled.span`
  font-size: 12px;
`;

const Info = styled.p`
  margin: 4px 0px 0px 0px;
  font-size: 14px;
  color: ${props => props.theme.colors.natural255};
`;

const Creator = styled.a`
  font-weight: bold;
  color: ${props => props.theme.colors.white};
`;

const Meta = styled.span`
  &:before {
    content: '•';
    margin: 0px 4px;
  }
`;

const Cover = styled.figure`
  width: 192px;
  height: 192px;
  box-shadow: 0 4px 60px rgba(255, 255, 255, 0.5);
  margin: 0px;

  @media screen and (min-width: 1280px) {
    width: 232px;
    height: 232px;
  }
`;
const CoverImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

export function Heading({ playList }: Props) {
  return (
    <Container data-testid="heading">
      <Cover>
        <CoverImage alt="cover-image" src={playList?.images[0].url} />
      </Cover>
      <ContentContainer>
        <Type>PLAYLIST</Type>
        <Title>{playList?.name}</Title>
        <Info>
          <Creator>{playList?.owner.display_name}</Creator>
          <Meta>{playList?.followers.total} likes</Meta>
          <Meta>
            {formatMS(getTrackListTotalDuration(playList?.tracks.items ?? []))}
          </Meta>
        </Info>
      </ContentContainer>
    </Container>
  );
}
