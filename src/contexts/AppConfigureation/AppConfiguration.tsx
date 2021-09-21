import constate from 'constate';

function useAppConfiguration(props: { appMode?: string; nodeEnv?: string }) {
  const { appMode = import.meta.env.MODE } = props;
  return {
    featuresEnabled: {
      localPlayback: appMode !== 'test',
    },
  };
}
const [AppConfigurationProvider, useAppConfigurationContext] =
  constate(useAppConfiguration);
export { AppConfigurationProvider, useAppConfigurationContext };
