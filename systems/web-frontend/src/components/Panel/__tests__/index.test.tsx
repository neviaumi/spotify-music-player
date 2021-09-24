import { render, screen } from '@testing-library/react';

import { describe, expect, it } from '../../../../testHelper/test-runner';
import { AppThemeProvider } from '../../../contexts/Theme';
import { Panel } from '../index';

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
