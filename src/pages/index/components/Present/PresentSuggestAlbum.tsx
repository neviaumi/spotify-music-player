import styled from 'styled-components';

import {
  Props as TogglePlayerPlayingStateButtonProps,
  TogglePlayerPlayingStateButton,
} from '../../../../components/TogglePlayerPlayingStateButton/index';
import { usePlayingTrack } from '../../../../contexts/SpotifyWebPlayback/hooks/usePlayingTrack';
import type { AlbumSimplified } from '../../../../hooks/spotify/typings/Album';

export interface Props {
  'data-testid': string;
  onClickSuggestion: (suggestion: AlbumSimplified) => void;
  onClickToggleButton: (suggestion: AlbumSimplified) => void;
  suggestions?: AlbumSimplified[];
  title: string;
}

const Container = styled.div`
  padding: ${props => props.theme.spaces.m} 0;
`;

const SuggestionsContainer = styled.article`
  display: flex;
  max-width: 100%;
  overflow: scroll;
`;

const Heading = styled.h1`
  display: block;
  font-size: ${props => props.theme.typography.size.xl};
  line-height: 1.6;
`;

const Suggestion = styled.a`
  background: ${props => props.theme.colors.contrast1};
  border-radius: 8px;
  display: block;
  margin-right: ${props => props.theme.spaces.m};
  min-width: 164px;
  padding: ${props => props.theme.spaces.xl} ${props => props.theme.spaces.xl}
    ${props => props.theme.spaces.m};
  text-decoration: none;
  width: 164px;
  :hover {
    background: ${props => props.theme.colors.contrast2};
    cursor: pointer;
  }
`;

const ToggleButton = styled(TogglePlayerPlayingStateButton)<
  TogglePlayerPlayingStateButtonProps<AlbumSimplified>
>`
  outline: none;
  border: 0;
  border-radius: 500px;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 10;
  bottom: 8px;
  right: 8px;
  visibility: hidden;
  background-color: ${props => props.theme.colors.green};
  color: #fff;
  ${Suggestion}:hover & {
    visibility: visible;
  }
  :hover {
    transform: scale(1.06);
  }
  ${props => {
    if (props.isBelongCurrentTrack)
      return `
    visibility: visible;
`;
    return '';
  }}
`;

const SuggestionCover = styled.img`
  display: block;
  height: 164px;
  margin-bottom: ${props => props.theme.spaces.m};
  object-fit: cover;
  width: 100%;
`;

const SuggestionHeading = styled.section`
  height: 62px;
  overflow: hidden;
`;

const SuggestionName = styled.p`
  color: ${props => props.theme.colors.foreground};
  font-size: ${props => props.theme.typography.size.s};
  font-weight: bold;
  margin: 0px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const SuggestionDescription = styled.span`
  color: ${props => props.theme.colors.contrast4};
  display: block;
  font-size: ${props => props.theme.typography.size.xs};
  line-height: ${props => props.theme.typography.size.l};
  margin-top: ${props => props.theme.spaces.xxxs};
  margin-top: ${props => props.theme.spaces.xxxs};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export function PresentSuggestAlbum({
  title,
  suggestions,
  onClickSuggestion,
  onClickToggleButton,
  'data-testid': dataTestId,
}: Props) {
  const currentTrack = usePlayingTrack();

  if (!suggestions || suggestions?.length === 0) return null;
  return (
    <Container data-testid={dataTestId}>
      <Heading>{title}</Heading>
      <SuggestionsContainer>
        {suggestions?.map(suggestion => (
          <Suggestion
            data-testid={`${dataTestId}-item`}
            href=""
            key={suggestion.id}
            onClick={e => {
              e.preventDefault();
              onClickSuggestion(suggestion);
            }}
          >
            <div
              style={{
                position: 'relative',
              }}
            >
              <SuggestionCover src={suggestion.images[0]?.url} />
              <ToggleButton
                isBelongCurrentTrack={currentTrack?.uri === suggestion.uri}
                item={suggestion}
                onClickToggleButton={onClickToggleButton}
              />
            </div>
            <SuggestionHeading>
              <SuggestionName>{suggestion.name}</SuggestionName>
              <SuggestionDescription>
                {suggestion.artists
                  .map(artist => artist.name)
                  .slice(0, 3)
                  .join(',')}
              </SuggestionDescription>
            </SuggestionHeading>
          </Suggestion>
        ))}
      </SuggestionsContainer>
    </Container>
  );
}
