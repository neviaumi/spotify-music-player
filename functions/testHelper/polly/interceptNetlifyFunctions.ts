import type { Polly } from '@pollyjs/core';

export function interceptNetlifyFunctions(polly: Polly) {
  const { server } = polly;
  server.host('http://localhost', () => {
    server.namespace('.netlify/functions', () => {
      server.any('*').intercept(async (req, res) => {
        const functionName = req.pathname.split('/')[3];
        const { handler } = await import(`../../${functionName}`);
        const { body, headers, statusCode } = await handler(
          {
            queryStringParameters: req.query,
          },
          {},
        );
        res.status(statusCode).setHeaders(headers).send(body);
      });
    });
  });
}
