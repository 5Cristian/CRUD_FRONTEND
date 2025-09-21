import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import TasksPage from './pages/TasksPage.jsx';
import ProtectedRoute from './routes/ProtectedRoute.jsx';

function RootRedirect() {
  const { isAuthenticated } = useAuth();
  return (
    <Navigate to={isAuthenticated ? '/tasks' : '/login'} replace />
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Raíz: redirige según sesión */}
          <Route path="/" element={<RootRedirect />} />

          {/* Públicas */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protegidas */}
          <Route element={<ProtectedRoute />}>
            <Route path="/tasks" element={<TasksPage />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
