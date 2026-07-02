import { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Login } from './pages/Login';

// Lazy-loaded: @react-pdf/renderer is a large dependency and is only needed
// once a user is logged in and generating documents, not on the public
// landing page.
const Documents = lazy(() => import('./pages/Documents').then((m) => ({ default: m.Documents })));

// HashRouter is used (instead of BrowserRouter) so client-side routes work
// on GitHub Pages without extra server-side rewrite configuration.
function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <HashRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/documents"
                element={
                  <ProtectedRoute>
                    <Suspense fallback={<p className="loading">Loading…</p>}>
                      <Documents />
                    </Suspense>
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
        </HashRouter>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
