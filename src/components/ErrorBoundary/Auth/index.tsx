import { path } from 'ramda';
import { Component, ErrorInfo } from 'react';
import { Redirect } from 'react-router-dom';

import { AppError } from '../../../errors/AppError';

export class AuthErrorBoundary extends Component<
  unknown,
  {
    error?: {
      err: Error | AppError;
      info: ErrorInfo;
    };
  }
> {
  constructor(props: unknown) {
    super(props);
    this.state = {};
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({
      error: {
        err: error,
        info: errorInfo,
      },
    });
    return;
  }

  render() {
    const { error } = this.state;
    if (error) {
      const err = error.err;
      if (err instanceof AppError && err.fallbackPath) {
        const location = path(['meta', 'location'], err);
        if (!location) {
          return <Redirect to={err.fallbackPath} />;
        }
        return (
          <Redirect
            to={{
              pathname: err.fallbackPath,
              state: {
                from: location,
              },
            }}
          />
        );
      }
      return <div data-testid="error-fallback">{err.message}</div>;
    }
    return this.props.children;
  }
}
