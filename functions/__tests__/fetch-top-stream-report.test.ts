import createEvent from '@serverless/event-mocks';
import type { Context } from 'aws-lambda';

import { handler } from '../fetch-top-stream-report';
import { createPollyContext } from '../testHelper/polly/createPollyContext';

createPollyContext({
  mode: 'record',
});

describe('Test fetch-top-stream-report', () => {
  it('400 if query missing', async () => {
    const event = createEvent('aws:apiGateway', {
      queryStringParameters: {},
    } as any);
    const response = await handler(event, {} as Context, jest.fn());
    expect(response.statusCode).toStrictEqual(400);
  });
  it('Fetch csv from spotify charts and transform to JSON', async () => {
    const event = createEvent('aws:apiGateway', {
      queryStringParameters: {
        period: 'weekly',
        region: 'hk',
      },
    } as any);
    const response = await handler(event, {} as Context, jest.fn());
    expect(response.headers).toStrictEqual({
      'Content-Type': 'application/json',
    });
    expect(response.statusCode).toStrictEqual(200);
    expect(() => JSON.parse(response.body)).not.toThrow();
    const {
      data: { items },
    } = JSON.parse(response.body);
    expect(items[0]).toStrictEqual({
      artist: expect.any(String),
      position: expect.any(String),
      streams: expect.any(String),
      trackId: expect.any(String),
      trackName: expect.any(String),
      url: expect.any(String),
    });
  });
});
