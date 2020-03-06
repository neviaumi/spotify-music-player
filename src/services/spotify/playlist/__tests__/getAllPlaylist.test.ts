import createSpotifyAPIClient from '../../../../utils/createSpotifyAPIClient';
import getAllPlaylist from '../getAllPlaylist';

it('Should resolve value', async () => {
  const client = createSpotifyAPIClient(
    'BQAFY_-XXtgK4RTXaEorQRTWux7-plGlDCjTszjGLg9kKv3nPoPlGe1H-S13kJYnQGqvfK9cTG9mpTpADYmSG1R-HAm5wqwTOUMP2HVx8xHqO0N0XFK8jeVNIIC3rMaUFxmLLNP-ilF-xEsK5eT6jrLx51imhw2VM2P4FmTWaifgV699CzylcfHq7aD1IimyD8r-cAZT4KZriy8Zog8CGxRM',
  );
  const response = await getAllPlaylist(client);
  expect(response.data.items).toBeDefined();
});
