import { last } from 'ramda';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { useSpotifyWebPlayback } from '../../../../contexts/SpotifyWebPlayback';
import { getIdFromSpotifyURI } from '../../../../utils/getIdFromSpotifyURI';

const Container = styled.section.attrs({
  'aris-label': 'track-info-container',
})`
  display: flex;
  min-width: 180px;
  width: 30%;
`;

const ThumbnailFigure = styled.figure`
  display: flex;
  margin: 0px;
  max-width: 100%;
`;

const Thumbnail = styled.img`
  height: 56px;
  object-fit: cover;
  width: 56px;
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
  font-size: ${props => props.theme.typography.size.s};
  font-weight: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Artist = styled.h2`
  color: ${props => props.theme.colors.contrast4};
  font-size: ${props => props.theme.typography.size.xs};
  font-weight: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export function TrackInfo() {
  const {
    data: { currentPlaybackState },
  } = useSpotifyWebPlayback();
  if (!currentPlaybackState || !currentPlaybackState.track)
    return <Container />;
  const { track: currentPlayingTrack } = currentPlaybackState;
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
