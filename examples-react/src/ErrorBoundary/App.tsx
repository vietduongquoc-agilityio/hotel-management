import ErrorBoundary from './ErrorBoundary';
import MyComponent from './Error';

function AppError() {
  return (
    <div>
      <h1>My Application</h1>
      <ErrorBoundary>
        <MyComponent />
      </ErrorBoundary>
    </div>
  );
}

export default AppError;
