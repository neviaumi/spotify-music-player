import styled from 'styled-components';

import type { PlaylistSimplified } from '../../../../hooks/spotify/typings/Playlist';

export interface Props {
  'data-testid': string;
  onClickSuggestion: (suggestion: PlaylistSimplified) => void;
  suggestions?: PlaylistSimplified[];
  title?: string;
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
  font-size: ${props => props.theme.typography.size.l};
  line-height: 1.6;
  display: block;
`;

const Suggestion = styled.a`
  display: block;
  width: 164px;
  min-width: 164px;
  padding: ${props => props.theme.spaces.xl};
  ${props => props.theme.spaces.xl};
  ${props => props.theme.spaces.m};
  background: ${props => props.theme.colors.contrast2};
  border-radius: 8px;
  text-decoration: none;
  margin-right: ${props => props.theme.spaces.m};
  :hover {
    cursor: pointer;
  }
`;

const SuggestionCover = styled.img`
  width: 100%;
  height: 164px;
  display: block;
  object-fit: cover;
  margin-bottom: ${props => props.theme.spaces.m};
`;

const SuggestionHeading = styled.section`
  height: 62px;
  overflow: hidden;
`;

const SuggestionName = styled.p`
  font-size: ${props => props.theme.typography.size.s};
  line-height: 20px;
  font-weight: 700;
  letter-spacing: 0.24px;
  margin: 0px;
  color: ${props => props.theme.colors.foreground};
`;

const SuggestionDescription = styled.span`
  display: block;
  font-size: ${props => props.theme.typography.size.xs};
  line-height: 18px;
  margin-top: ${props => props.theme.spaces.xxxs};
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${props => props.theme.colors.contrast4};
  margin-top: ${props => props.theme.spaces.xxxs};
  overflow: hidden;
`;

export function PresentSuggestPlayList({
  title,
  suggestions,
  onClickSuggestion,
  'data-testid': dataTestId,
}: Props) {
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
            <SuggestionCover src={suggestion.images[0]?.url} />
            <SuggestionHeading>
              <SuggestionName>{suggestion.name}</SuggestionName>
              <SuggestionDescription>
                {suggestion.description}
              </SuggestionDescription>
            </SuggestionHeading>
          </Suggestion>
        ))}
      </SuggestionsContainer>
    </Container>
  );
}
