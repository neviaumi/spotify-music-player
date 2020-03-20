import { render } from '@testing-library/react';
import React from 'react';

import ThemeProvider from '../../../contexts/Theme';
import PlayListSuggestion from '../PlayListSuggestion';

describe('Test render PlayListSuggestion', () => {
  it('Should render PlayListSuggestion', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <PlayListSuggestion />
      </ThemeProvider>,
    );
    expect(getByTestId('play-list-suggestion')).toBeDefined();
  });
});
