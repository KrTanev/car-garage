import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Layout } from './components/Layout';
import { Spinner } from './components/Spinner';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Login } from './pages/Login';

// Lazy-loaded: @react-pdf/renderer is a large dependency and is only needed
// once a user is logged in and generating documents, not on the public
// landing page.
const Documents = lazy(() =>
  import('./pages/Documents').then((m) => ({ default: m.Documents })),
);

// BrowserRouter gives clean URLs (/about instead of /#/about). GitHub Pages
// has no server-side rewrites, so direct loads of a sub-path 404 by default —
// public/404.html + the inline script in index.html work around that (see
// README's "Routing" section). `basename` tracks Vite's `base` so this
// matches "/" in dev and "/car-garage/" in the built site.
function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <BrowserRouter basename={import.meta.env.BASE_URL}>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route
                  path="/documents"
                  element={
                    <ProtectedRoute>
                      <Suspense fallback={<Spinner />}>
                        <Documents />
                      </Suspense>
                    </ProtectedRoute>
                  }
                />
              </Route>
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
