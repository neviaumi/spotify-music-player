import { render } from '@testing-library/react';
import React from 'react';

import { TestApp } from '../../../App';
import Suggestion from '../index';

describe('Test render PlayListSuggestion', () => {
  it('Should render PlayListSuggestion', () => {
    const { getByTestId } = render(
      <TestApp DataFetchingConfigProviderProps={{ initialData: { data: {} } }}>
        <Suggestion />
      </TestApp>,
    );
    expect(getByTestId('user-suggestion')).toBeDefined();
  });
});
