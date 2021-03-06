import 'src/contexts/SpotifyWebPlayback/SpotifyPlayer.d';

import { Link } from 'react-router-dom';
import { getIdFromSpotifyURI } from 'src/utils/getIdFromSpotifyURI';
import styled from 'styled-components';

interface Props {
  currentPlayingTrack?: Spotify.Track;
}

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
  margin: 0 ${props => props.theme.spaces.l};
`;

const TrackName = styled.h1`
  color: ${props => props.theme.colors.white};
  font-weight: normal;
  font-size: 14px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const Artist = styled.h2`
  color: ${props => props.theme.colors.grey179};
  font-weight: normal;
  font-size: 12px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export function TrackInfo({ currentPlayingTrack }: Props) {
  if (!currentPlayingTrack) return <></>;
  return (
    <Container>
      <ThumbnailFigure>
        <Thumbnail
          alt={currentPlayingTrack.album.name}
          src={currentPlayingTrack.album.images.pop()?.url}
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
