import { render } from '@testing-library/react';
import React from 'react';

import ThemeProvider from '../../../contexts/Theme';
import Suggestion from '../index';

describe('Test render PlayListSuggestion', () => {
  it('Should render PlayListSuggestion', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <Suggestion />
      </ThemeProvider>,
    );
    expect(getByTestId('user-suggestion')).toBeDefined();
  });
});
