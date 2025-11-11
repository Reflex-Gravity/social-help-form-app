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
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <h2>{t('app.errorBoundaryMessage')}</h2>
            <button onClick={() => this.setState({ hasError: false, error: null })}>
              {t('buttons.tryAgain')}
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

const TranslatedErrorBoundary = withTranslation()(ErrorBoundary);
export default TranslatedErrorBoundary;
