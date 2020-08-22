import React from 'react';

import type AppError from '../../../errors/AppError';
import DataFetchingError from '../../../errors/DataFetchingError';

export default class DataFetchingErrorBoundary extends React.Component<
  unknown,
  {
    error?: {
      err: Error | AppError;
      info: React.ErrorInfo;
    };
  }
> {
  constructor(props: unknown) {
    super(props);
    this.state = {};
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
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
      if (err instanceof DataFetchingError) {
        return <div data-testid="error">{err.message}</div>;
      }
      throw err;
    }
    return this.props.children;
  }
}
