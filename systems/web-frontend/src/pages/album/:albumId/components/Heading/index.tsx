import styled from 'styled-components';

import type { AlbumFull } from '../../../../../hooks/spotify/typings/Album';
import { formatMS } from '../../../../../utils/formatMS';
import { getTrackListTotalDuration } from '../../../../../utils/getTrackListTotalDuration';

interface Props {
  album?: AlbumFull;
}

const Container = styled.section`
  align-items: flex-end;
  display: flex;
`;

const ContentContainer = styled.main`
  margin-left: ${props => props.theme.spaces.xxl};
`;

const Title = styled.h1`
  font-size: ${props => props.theme.typography.size.xxl};
  line-height: 48px;
  margin: 0px;
  padding: ${props => props.theme.spaces.s} 0px;
`;

const Type = styled.span`
  font-size: ${props => props.theme.typography.size.xs};
`;

const Info = styled.section`
  color: ${props => props.theme.colors.contrast4};
  font-size: ${props => props.theme.typography.size.s};
  margin: ${props => props.theme.spaces.xxxs} 0px 0px 0px;
`;

const Creator = styled.figure`
  color: ${props => props.theme.colors.foreground};
  display: inline-block;
  font-weight: bold;
  margin: 0px;
`;

const ArtistName = styled.figcaption``;

const Meta = styled.span`
  &:before {
    content: '•';
    margin: 0px ${props => props.theme.spaces.xxxs};
  }
`;

const Cover = styled.figure`
  box-shadow: 0 4px 60px rgba(255, 255, 255, 0.5);
  height: 192px;
  margin: 0px;
  width: 192px;

  @media screen and (min-width: 1280px) {
    height: 232px;
    width: 232px;
  }
`;
const CoverImage = styled.img`
  height: 100%;
  object-fit: cover;
  width: 100%;
`;

export function Heading({ album }: Props) {
  return (
    <Container data-testid="heading">
      <Cover>
        <CoverImage alt="cover-image" src={album?.images[0].url} />
      </Cover>
      <ContentContainer>
        <Type>ALBUM</Type>
        <Title>{album?.name}</Title>
        <Info>
          <Creator>
            <ArtistName>{album?.artists[0].name}</ArtistName>
          </Creator>
          <Meta>{album?.total_tracks} songs</Meta>
          <Meta>
            {formatMS(getTrackListTotalDuration(album?.tracks.items ?? []))}
          </Meta>
        </Info>
      </ContentContainer>
    </Container>
  );
}
