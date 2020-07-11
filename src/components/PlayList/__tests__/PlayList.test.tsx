import { render } from '@testing-library/react';
import React from 'react';

import ThemeProvider from '../../../contexts/Theme';
import { PlayList } from '../PlayList';

it('render without error', () => {
  const { getByTestId } = render(
    <ThemeProvider>
      <PlayList playListId="foobar" />
    </ThemeProvider>,
  );
  expect(getByTestId('playlist-info')).toBeDefined();
});
