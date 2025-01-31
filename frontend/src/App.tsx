import { Route, Routes } from 'react-router';
import QuestionsPage from './pages/questions';
import ProtectedLayout from './layout/ProtectedLayout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LoginPage from './pages/Login';
import { UserProvider } from './context/userContext';
import DefaultLayout from './layout/DefaultLayout';
import Dashboard from './pages/Dashboard';
import SEO from './components/SEO';
import RegisterPage from './pages/Register';
import VerifyEmailPage from './pages/VerifyEmail';
import QuizHistory from './pages/QuizHistory';
import SettingsPage from './pages/Settings';

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SEO
        title="Question Bank: A platform for learning"
        description="
        Question Bank is a platform for learning where you can learn and practice questions from various subjects."
        name="Question Bank: A platform for learning"
        type="website"
      />
      <UserProvider>
        <Routes>
          <Route element={<ProtectedLayout />}>
            <Route path="/session/:sessionId" element={<QuestionsPage />} />
            <Route path="user-quiz" element={<QuizHistory />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route index element={<Dashboard />} />
          </Route>
          <Route element={<DefaultLayout />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="verify-email" element={<VerifyEmailPage />} />
          </Route>
          {/* <Route path="about" element={<About />} />

      <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      <Route path="concerts">
        <Route index element={<ConcertsHome />} />
        <Route path=":city" element={<City />} />
        <Route path="trending" element={<Trending />} />
      </Route> */}
        </Routes>
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;
