import { Route, Routes } from 'react-router';
import QuestionsPage from './pages/questions';
import ProtectedLayout from './layout/ProtectedLayout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LoginPage from './pages/Login';
import { UserProvider } from './context/userContext';
import DefaultLayout from './layout/DefaultLayout';
import Dashboard from './pages/Dashboard';
import SEO from './component/SEO';

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
            <Route path="user-profile" element={<QuestionsPage />} />
            <Route index element={<Dashboard />} />
          </Route>
          <Route element={<DefaultLayout />}>
            <Route path="login" element={<LoginPage />} />
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
