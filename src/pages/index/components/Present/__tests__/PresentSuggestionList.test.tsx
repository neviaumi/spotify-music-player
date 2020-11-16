import { render, screen } from '@testing-library/react';
import events from '@testing-library/user-event';
import React from 'react';

import { TestApp } from '../../../../../App';
import PresentSuggestionList from '../PresentSuggestionList';

describe('Test render PresentSuggestionList component', () => {
  it('Should render Present component', () => {
    render(
      <TestApp>
        <PresentSuggestionList
          data-testid=""
          onClickSuggestion={jest.fn()}
          suggestions={[
            {
              description: 'FooBar',
              id: 'FooBarID',
              // @ts-expect-error
              images: [{ url: 'https://www.google.com' }],
              name: 'FooBar',
            },
          ]}
          title="Hello World"
        />
      </TestApp>,
    );
    expect(
      screen.getByRole('heading'),
      'Should set heading to title',
    ).toHaveTextContent('Hello World');
    expect(
      screen.getAllByRole('link'),
      'Should render suggestion to clickable link',
    ).toHaveLength(1);
  });
  it('Should trigger onClickSuggestion when Suggestion clicked', () => {
    const onClickSuggestion = jest.fn();
    const suggestion = {
      description: 'FooBar',
      id: 'FooBarID',
      images: [{ url: 'https://www.google.com' }],
      name: 'FooBar',
    };
    render(
      <TestApp>
        <PresentSuggestionList
          data-testid=""
          onClickSuggestion={onClickSuggestion}
          // @ts-expect-error
          suggestions={[suggestion]}
          title="Hello World"
        />
      </TestApp>,
    );
    events.click(screen.getAllByRole('link')[0]);
    expect(onClickSuggestion).toHaveBeenCalledWith(suggestion);
  });
});
