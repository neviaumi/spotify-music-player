import { render } from '@testing-library/react';
import React from 'react';

import Panel from '../';
import ThemeProvider from '../../../contexts/Theme';

describe('Test render Panel component', () => {
  it('Should render without error', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <Panel
          Bottom={<div>FooBar</div>}
          Left={<div>Hello</div>}
          Right={<div>World</div>}
        />
      </ThemeProvider>,
    );
    const panelLeft = getByTestId('panel-left');
    const panelRight = getByTestId('panel-right');
    const panelBottom = getByTestId('panel-bottom');

    expect(panelLeft).toBeDefined();
    expect(panelRight).toBeDefined();
    expect(panelBottom).toBeDefined();
  });
});
