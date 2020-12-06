import { render, screen } from '@testing-library/react';
import React from 'react';

import Panel from '../';
import ThemeProvider from '../../../contexts/Theme';

describe('Test render Panel component', () => {
  it('Should render without error', () => {
    render(
      <ThemeProvider>
        <Panel
          Bottom={<div>FooBar</div>}
          Left={<div>Hello</div>}
          Right={<div>World</div>}
        />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('panel-left')).toBeVisible();
    expect(screen.getByTestId('panel-right')).toBeVisible();
    expect(screen.getByTestId('panel-bottom')).toBeVisible();
  });
});
