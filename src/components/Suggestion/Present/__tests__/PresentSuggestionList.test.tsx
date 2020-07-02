import { render } from '@testing-library/react';
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
        />
      </ThemeProvider>,
    );
    expect(getByTestId('present-suggestions-container')).toBeDefined();
    expect(getByTestId('present-suggestion')).toBeDefined();
  });
});
