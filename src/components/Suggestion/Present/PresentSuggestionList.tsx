import React from 'react';
import styled from 'styled-components';

interface Props {
  title: string;
  suggestions?: Spotify.Playlist[];
}

const Container = styled.div`
  padding: ${props => props.theme.spaces.xl} 0;
`;

const SuggestionsContainer = styled.article`
  display: flex;
  max-width: 100%;
  overflow: scroll;
`;

const Heading = styled.h1`
  font-size: 28px;
  line-height: 1.6;
  display: block;
`;

const Suggestion = styled.a`
  display: block;
  width: 164px;
  min-width: 164px;
  padding: ${props => props.theme.spaces.xxl};
  ${props => props.theme.spaces.xxl};
  ${props => props.theme.spaces.xl};
  background: #282828;
  border-radius: 8px;
  margin-right: ${props => props.theme.spaces.xl};
`;

const SuggestionCover = styled.img`
  width: 100%;
  height: 164px;
  display: block;
  object-fit: cover;
  margin-bottom: ${props => props.theme.spaces.xl};
`;

const SuggestionHeading = styled.div`
  height: 62px;
  overflow: hidden;
`;

const SuggestionName = styled.p`
  font-size: 14px;
  line-height: 20px;
  font-weight: 700;
  letter-spacing: 0.24px;
`;

const SuggestionDescription = styled.span`
  display: block;
  font-size: 12px;
  line-height: 18px;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${props => props.theme.colors.natural255};
  margin-top: ${props => props.theme.spaces.s};
  overflow: hidden;
`;

export default ({ title, suggestions = [], ...rest }: Props) => {
  return (
    <Container {...rest}>
      <Heading>{title}</Heading>
      <SuggestionsContainer data-testid="present-suggestions-container">
        {suggestions.map(suggestion => (
          <Suggestion key={suggestion.id} data-testid="present-suggestion">
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
};
