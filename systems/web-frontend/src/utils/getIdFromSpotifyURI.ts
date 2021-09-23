export function getIdFromSpotifyURI(uri: string) {
  return uri.split(':')[2];
}
