import type { AxiosError } from 'axios';
import { omit, pick } from 'ramda';
import type { FallbackProps } from 'react-error-boundary';
import { serializeError } from 'serialize-error';
import styled from 'styled-components';

import { jsonParse } from '../../utils/jsonParse';

const Container = styled.div.attrs({
  role: 'alert',
})`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.colors.black};
  color: ${props => props.theme.colors.white};
  flex-direction: column;
  padding: ${props => props.theme.spaces.xxl};
`;

const SectionHeading = styled.h1`
  display: flex;
  margin: 0px;
  justify-content: center;
`;

const ErrorContainer = styled.section`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const HttpReqResContainer = styled.section`
  display: flex;
  justify-content: center;
  gap: 0 ${props => props.theme.spaces.xxl};
`;

const JSONTextContainer = styled.pre`
  overflow-wrap: break-word;
  white-space: pre-wrap;
`;

export function ErrorFallback({ error }: FallbackProps) {
  // @ts-expect-error react-error-boundary no way to configure error type
  const shouldSerializeError = error.isAxiosError !== true;
  if (process.env.NODE_ENV === 'test')
    // eslint-disable-next-line no-console
    console.error(JSON.stringify(serializeError(error), null, 4));
  if (shouldSerializeError) {
    return (
      <Container aria-label={error.message}>
        <ErrorContainer>
          <SectionHeading>Error</SectionHeading>
          <JSONTextContainer>
            {JSON.stringify(serializeError(error), null, 4)}
          </JSONTextContainer>
        </ErrorContainer>
      </Container>
    );
  }
  const {
    config: { method, url, data, params },
    response = {},
  } = error as AxiosError;
  const safeRequest = { data: jsonParse(data), method, params, url };
  const safeError = omit(['config'], (error as AxiosError).toJSON());
  const safeResponse = pick(['status', 'data', 'headers'], response);
  return (
    <Container aria-label={error.message}>
      <ErrorContainer>
        <SectionHeading>Error</SectionHeading>
        <JSONTextContainer>
          {JSON.stringify(safeError, null, 4)}
        </JSONTextContainer>
      </ErrorContainer>
      <HttpReqResContainer>
        <div>
          <SectionHeading>Request</SectionHeading>
          <JSONTextContainer>
            {JSON.stringify(safeRequest, null, 4)}
          </JSONTextContainer>
        </div>
        <div>
          <SectionHeading>Response</SectionHeading>
          <JSONTextContainer>
            {JSON.stringify(safeResponse, null, 4)}
          </JSONTextContainer>
        </div>
      </HttpReqResContainer>
    </Container>
  );
}
