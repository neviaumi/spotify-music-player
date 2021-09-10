import type { AxiosError } from 'axios';
import { omit, pick } from 'ramda';
import type { FallbackProps } from 'react-error-boundary';
import { serializeError } from 'serialize-error';
import styled from 'styled-components';

import { jsonParse } from '../../utils/jsonParse';

const Container = styled.div.attrs({
  role: 'alert',
})`
  align-items: center;
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.foreground};
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  padding: ${props => props.theme.spaces.xl};
  width: 100%;
`;

const SectionHeading = styled.h1`
  display: flex;
  justify-content: center;
  margin: 0px;
`;

const ErrorContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const HttpReqResContainer = styled.section`
  display: flex;
  gap: 0 ${props => props.theme.spaces.xl};
  justify-content: center;
`;

const JSONTextContainer = styled.pre`
  overflow-wrap: break-word;
  white-space: pre-wrap;
`;

export function ErrorFallback({ error }: FallbackProps) {
  // @ts-expect-error react-error-boundary no way to configure error type
  const shouldSerializeError = error.isAxiosError !== true;
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
