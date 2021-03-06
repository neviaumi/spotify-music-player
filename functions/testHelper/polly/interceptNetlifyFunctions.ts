import type { Polly } from '@pollyjs/core';

export function interceptNetlifyFunctions(polly: Polly) {
  const { server } = polly;
  server.host('http://localhost', () => {
    server.namespace('.netlify/functions', () => {
      server.any('*').intercept(async (req, res) => {
        const functionName = req.pathname.split('/')[3];
        const { body, statusCode } = await import(
          `../../__mock__/${functionName}.json`
        );
        res.status(statusCode).json(body);
      });
    });
  });
}
