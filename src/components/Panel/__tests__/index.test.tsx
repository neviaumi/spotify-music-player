import { render, screen } from '@testing-library/react';

import { AppThemeProvider } from '../../../contexts/Theme';
import { Panel } from '../';

describe('Test render Panel component', () => {
  it('Should render without error', () => {
    render(
      <AppThemeProvider>
        <Panel
          Bottom={<div>FooBar</div>}
          Left={<div>Hello</div>}
          Right={<div>World</div>}
        />
      </AppThemeProvider>,
    );

    expect(screen.getByTestId('panel-left')).toBeVisible();
    expect(screen.getByTestId('panel-right')).toBeVisible();
    expect(screen.getByTestId('panel-bottom')).toBeVisible();
  });
});
