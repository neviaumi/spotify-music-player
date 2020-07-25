import React from 'react';
import styled from 'styled-components';

import useDataFetcher from '../../hooks/useDataFetcher';
import useSpotifyAPIClient from '../../hooks/useSpotifyAPIClient';
import getPlayList from '../../services/spotify/playlist/getPlayList';
import formatMS from '../../utils/formatMS';
import getTrackListTotalDuration from '../../utils/getTrackListTotalDuration';
import withSuspense from '../HOC/withSuspense';

interface Props {
  playListId: string;
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

export function PlayList({ playListId }: Props) {
  const apiClient = useSpotifyAPIClient();
  const { data: playlist } = useDataFetcher(`playlist-${playListId}`, () =>
    getPlayList(apiClient, playListId),
  );
  return (
    <Container data-testid="playlist-info">
      <Cover>
        <CoverImage src={playlist.images[0].url} />
      </Cover>
      <ContentContainer>
        <Type>PLAYLIST</Type>
        <Title>{playlist.name}</Title>
        <Info>
          <Creator>{playlist.owner.display_name}</Creator>
          <Meta>{playlist.followers.total} likes</Meta>
          <Meta>
            {formatMS(getTrackListTotalDuration(playlist.tracks.items))}
          </Meta>
        </Info>
      </ContentContainer>
    </Container>
  );
}

export default withSuspense(PlayList);
