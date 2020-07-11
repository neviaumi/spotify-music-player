import { render } from '@testing-library/react';
import React from 'react';

import { TestSWRConfigProvider } from '../../../contexts/SWR';
import ThemeProvider from '../../../contexts/Theme';
import Suggestion from '../index';

describe('Test render PlayListSuggestion', () => {
  it('Should render PlayListSuggestion', () => {
    const { getByTestId } = render(
      <TestSWRConfigProvider value={{ initialData: { data: {} } }}>
        <ThemeProvider>
          <Suggestion />
        </ThemeProvider>
      </TestSWRConfigProvider>,
    );
    expect(getByTestId('user-suggestion')).toBeDefined();
  });
});
