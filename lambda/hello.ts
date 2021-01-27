export async function handler() {
  return {
    body: JSON.stringify({ msg: 'hello world' }),
    headers: {
      'Content-Type': 'application/json',
    },
    statusCode: 200,
  };
}
