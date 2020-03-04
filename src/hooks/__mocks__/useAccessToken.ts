export default () => {
  return {
    setAccessInfo: jest.fn(),
    getAccessInfo: jest.fn().mockReturnValue('Spotify Access Token here'),
  };
};
