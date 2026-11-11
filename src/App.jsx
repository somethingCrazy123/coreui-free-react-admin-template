import React, { Suspense, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { CSpinner, useColorModes } from '@coreui/react'
import './scss/style.scss'

import RequireRole from './routes/RequireRole'

const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))
const AdminLoginPage = React.lazy(() => import('./views/login/AdminLoginPage'))

const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('nri-admin-theme')
  const storedTheme = useSelector((state) => state.theme)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
    if (theme) {
      setColorMode(theme)
    }

    if (isColorModeSet()) {
      return
    }

    setColorMode(storedTheme)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Suspense
      fallback={
        <div className="pt-3 text-center">
          <CSpinner color="primary" variant="grow" />
        </div>
      }
    >
      <Routes>
        <Route path="/login" element={<AdminLoginPage />} />
        <Route
          path="*"
          element={
            <RequireRole roles={['admin', 'staff']} loginPath="/login">
              <DefaultLayout />
            </RequireRole>
          }
        />
      </Routes>
    </Suspense>
  )
}

export default App
