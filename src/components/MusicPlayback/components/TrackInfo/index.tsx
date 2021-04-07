import 'src/contexts/SpotifyWebPlayback/SpotifyPlayer.d';

import { last } from 'ramda';
import { Link } from 'react-router-dom';
import { getIdFromSpotifyURI } from 'src/utils/getIdFromSpotifyURI';
import styled from 'styled-components';

import { useSpotifyWebPlayback } from '../../../../contexts/SpotifyWebPlayback';

const Container = styled.section.attrs({
  'aris-label': 'track-info-container',
})`
  width: 30%;
  min-width: 180px;
  display: flex;
`;

const ThumbnailFigure = styled.figure`
  margin: 0px;
  display: flex;
  max-width: 100%;
`;

const Thumbnail = styled.img`
  width: 56px;
  height: 56px;
  object-fit: cover;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const TrackInfoContainer = styled.figcaption`
  margin: 0 ${props => props.theme.spaces.s};
  max-width: 100%;
  overflow: hidden;
`;

const TrackName = styled.h1`
  color: ${props => props.theme.colors.foreground};
  font-weight: normal;
  font-size: ${props => props.theme.typography.size.s};
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const Artist = styled.h2`
  color: ${props => props.theme.colors.contrast4};
  font-weight: normal;
  font-size: ${props => props.theme.typography.size.xs};
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export function TrackInfo() {
  const {
    data: { currentPlayingTrack },
  } = useSpotifyWebPlayback();
  if (!currentPlayingTrack) return <Container />;
  return (
    <Container>
      <ThumbnailFigure>
        <Thumbnail
          alt={currentPlayingTrack.album.name}
          src={last(currentPlayingTrack.album.images)?.url}
        />
        <TrackInfoContainer>
          <StyledLink
            to={`/album/${getIdFromSpotifyURI(currentPlayingTrack.album.uri)}`}
          >
            <TrackName>{currentPlayingTrack.name}</TrackName>
          </StyledLink>
          <Artist>{currentPlayingTrack.artists[0]?.name}</Artist>
        </TrackInfoContainer>
      </ThumbnailFigure>
    </Container>
  );
}
