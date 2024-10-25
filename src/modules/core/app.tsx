import { FC, lazy, Suspense } from 'react'
import { I18nextProvider } from 'react-i18next'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import i18n from './i18next'
import ThemeProvider from './theme'
import { ToastContainer } from 'react-toastify'
import HomePage from '../home'

const App: FC = () => {
  // Create a client
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000 * 5, // 5 minutos despues de eso se hara un refetch de la data obsoleta
        gcTime: 0,
        refetchOnWindowFocus: true, // Hace el refetch cuando se cambie de pestaña y se regrese al sistema
      },
    },
  })

  const ReactQueryDevtoolsProduction = lazy(() =>
    import('@tanstack/react-query-devtools/production').then(d => ({
      default: d.ReactQueryDevtools,
    })),
  )

  return (
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <ToastContainer />

            <Routes>
              <Route path="/" element={<HomePage />} />
              {/*   <Route path="/" element={<Home />} />
                <Route
                  path="/dashboard/*"
                  element={renderProtectedRoute(Dashboard, '/')}
                />
              </Route>
              <Route path="*" element={<NotFound />} /> */}
            </Routes>
          </ThemeProvider>
          {import.meta.env.VITE_APP_ENV === 'dev' && (
            <Suspense fallback={null}>
              <ReactQueryDevtoolsProduction />
            </Suspense>
          )}
        </QueryClientProvider>
      </BrowserRouter>
    </I18nextProvider>
  )
}
export default App
