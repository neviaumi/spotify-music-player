import { render } from '@testing-library/react';
import React from 'react';

import Panel from '../';

describe('Test render Panel component', () => {
  it('Should render without error', () => {
    const { getByTestId } = render(
      <Panel
        Left={<div>Hello</div>}
        Right={<div>World</div>}
        Bottom={<div>FooBar</div>}
      />,
    );
    const panelLeft = getByTestId('panel-left');
    const panelRight = getByTestId('panel-right');
    const panelBottom = getByTestId('panel-bottom');

    expect(panelLeft).toBeDefined();
    expect(panelRight).toBeDefined();
    expect(panelBottom).toBeDefined();
  });
});
