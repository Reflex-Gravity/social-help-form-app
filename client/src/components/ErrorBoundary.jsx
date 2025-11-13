import { Button, Icon, Typography } from '@mui/material';
import React from 'react';
import { withTranslation } from 'react-i18next';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log to your error reporting service
    console.error('Error caught:', error, errorInfo);
    // Example: logErrorToService(error, errorInfo);
  }

  render() {
    const { t } = this.props;
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div
            className="bg-red-50 h-full flex flex-col justify-center items-center rounded-lg border border-red-100"
            style={{ padding: '20px', textAlign: 'center' }}
          >
            <Icon className="text-red-400 text-5xl text-center animate-pulse">error</Icon>
            <Typography className="my-3 text-[25px] text-red-800 font-bold">
              {t('app.errorBoundaryHeader')}
            </Typography>
            <Typography className="my-3 text-[18px]">{t('app.errorBoundaryMessage')}</Typography>
            <Button
              className="mt-3 text-[15px] font-bold"
              onClick={() => this.setState({ hasError: false, error: null })}
            >
              {t('buttons.tryAgain')}
            </Button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

const TranslatedErrorBoundary = withTranslation()(ErrorBoundary);
export default TranslatedErrorBoundary;
