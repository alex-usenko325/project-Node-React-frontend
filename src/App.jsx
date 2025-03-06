import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import PrivateRoute from './routes/PrivateRoute';
import RestrictedRoute from './routes/RestrictedRoute';
import { refreshUser } from './redux/auth/operations';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import SignInPage from './pages/SignInPage/SignInPage';
import Water from './components/Water/Water';
import TrackerPage from './pages/TrackerPage/TrackerPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

const App = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const isRefreshing = useSelector(state => state.auth.isRefreshing);

  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(refreshUser());
    }
  }, [dispatch, isLoggedIn]);

  if (isRefreshing) {
    return <p>Loading...</p>;
  }

  return (
    <Routes>
      {/* Редирект з кореневого шляху на /water */}
      <Route path="/" element={<Navigate to="/water" />} />

      <Route
        path="/login"
        element={
          <RestrictedRoute isLoggedIn={isLoggedIn}>
            <SignInPage />
          </RestrictedRoute>
        }
      />
      <Route
        path="/register"
        element={
          <RestrictedRoute isLoggedIn={isLoggedIn}>
            <SignUpPage />
          </RestrictedRoute>
        }
      />
      <Route
        path="/water"
        element={
          <PrivateRoute isLoggedIn={isLoggedIn}>
            <Water />
          </PrivateRoute>
        }
      />
      <Route
        path="/tracker"
        element={
          <PrivateRoute isLoggedIn={isLoggedIn}>
            <TrackerPage />
          </PrivateRoute>
        }
      />
      {/* Додано обробник невідомих маршрутів */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
