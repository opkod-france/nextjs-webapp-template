import Error from "@/app/components/shared/Error";
import React, { Component, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    // Mettre à jour l'état pour que le prochain rendu affiche l'UI de repli.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ error, errorInfo });

    // Vous pouvez aussi enregistrer l'erreur dans un service de rapport d'erreurs
    console.error("ErrorBoundary a attrapé une erreur", error, errorInfo);
  }

  render() {
    if (this.state.hasError && this.state.errorInfo && this.state.error) {
      return (
        <Error error={this.state.error} errorInfo={this.state.errorInfo} />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
