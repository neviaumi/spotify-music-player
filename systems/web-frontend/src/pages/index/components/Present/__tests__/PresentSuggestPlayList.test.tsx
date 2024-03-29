import { render, screen } from '@testing-library/react';
import events from '@testing-library/user-event';

import { PlaylistObject } from '../../../../../../testHelper/seeders/PlaylistObject';
import {
  describe,
  expect,
  it,
  jest,
} from '../../../../../../testHelper/test-runner';
import { TestApp } from '../../../../../App';
import { PresentSuggestPlayList } from '../PresentSuggestPlayList';

describe('Test render PresentSuggestPlayList component', () => {
  it('Should render nothing if given suggestion is undefined', () => {
    render(
      <TestApp>
        <PresentSuggestPlayList
          data-testid=""
          onClickSuggestion={jest.fn()}
          onClickToggleButton={jest.fn()}
          suggestions={undefined}
          title="Hello World"
        />
      </TestApp>,
    );
    expect(() => screen.getAllByText(/.+/)).toThrow();
  });

  it('Should render nothing if given suggestion is empty', () => {
    render(
      <TestApp>
        <PresentSuggestPlayList
          data-testid=""
          onClickSuggestion={jest.fn()}
          onClickToggleButton={jest.fn()}
          suggestions={[]}
          title="Hello World"
        />
      </TestApp>,
    );
    expect(() => screen.getAllByText(/.+/)).toThrow();
  });

  it('Should render Present component', () => {
    render(
      <TestApp>
        <PresentSuggestPlayList
          data-testid=""
          onClickSuggestion={jest.fn()}
          onClickToggleButton={jest.fn()}
          suggestions={[
            {
              description: 'FooBarDescription',
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
    expect(
      screen.getByText('FooBarDescription'),
      'Should use description',
    ).toBeVisible();
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
        <PresentSuggestPlayList
          data-testid=""
          onClickSuggestion={onClickSuggestion}
          onClickToggleButton={jest.fn()}
          // @ts-expect-error
          suggestions={[suggestion]}
          title="Hello World"
        />
      </TestApp>,
    );
    events.click(screen.getAllByRole('link')[0]);
    expect(onClickSuggestion).toHaveBeenCalledWith(suggestion);
  });
  it('Should not show the play button by default', async () => {
    const onClickSuggestion = jest.fn();
    const suggestion = PlaylistObject({
      description: 'FooBar',
      id: 'FooBarID',
      images: [{ url: 'https://www.google.com' }],
      name: 'FooBar',
    });
    render(
      <TestApp>
        <PresentSuggestPlayList
          data-testid=""
          onClickSuggestion={onClickSuggestion}
          onClickToggleButton={jest.fn()}
          suggestions={[suggestion]}
          title="Hello World"
        />
      </TestApp>,
    );
    expect(
      screen.queryByRole('button', {
        name: 'play',
      }),
    ).toBeNull();
  });
});
