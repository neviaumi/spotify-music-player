import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import ThemeProvider from '../../../../contexts/Theme';
import PresentSuggestionList from '../PresentSuggestionList';

describe('Test render PresentSuggestionList component', () => {
  it('Should render Present component', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <PresentSuggestionList
          suggestions={[
            {
              id: 'FooBarID',
              name: 'FooBar',
              description: 'FooBar',
              images: [{ url: 'https://www.google.com' }],
            } as any,
          ]}
          title="Hello World"
          onClickSuggestion={jest.fn()}
        />
      </ThemeProvider>,
    );
    expect(getByTestId('present-suggestions-container')).toBeDefined();
    expect(getByTestId('present-suggestion')).toBeDefined();
  });
  it('Should trigger onClickSuggestion when Suggestion clicked', () => {
    const onClickSuggestion = jest.fn();
    const suggestion = {
      id: 'FooBarID',
      name: 'FooBar',
      description: 'FooBar',
      images: [{ url: 'https://www.google.com' }],
    } as any;
    const { getByTestId } = render(
      <ThemeProvider>
        <PresentSuggestionList
          suggestions={[suggestion]}
          title="Hello World"
          onClickSuggestion={onClickSuggestion}
        />
      </ThemeProvider>,
    );
    expect(getByTestId('present-suggestions-container')).toBeDefined();
    expect(getByTestId('present-suggestion')).toBeDefined();
    fireEvent.click(getByTestId('present-suggestion'));
    expect(onClickSuggestion).toHaveBeenCalledWith(suggestion);
  });
});
