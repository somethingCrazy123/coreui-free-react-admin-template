import React from 'react'
import { Navigate } from 'react-router-dom'
import { CButton, CContainer, CSpinner } from '@coreui/react'
import { useAuth } from '../features/auth/useAuth'

/**
 * Guards the admin area.
 * Logged-out users go to /login. Logged-in users without a staff or admin role see "access denied".
 */
const RequireRole = ({ roles, loginPath, children }) => {
  const { user, isLoading, signOut } = useAuth()

  if (isLoading) {
    return (
      <div className="pt-5 text-center">
        <CSpinner color="primary" />
      </div>
    )
  }
  if (!user) return <Navigate to={loginPath} replace />

  if (!roles.includes(user.role)) {
    return (
      <CContainer className="pt-5 text-center">
        <h1 className="h3">Access denied</h1>
        <p className="text-body-secondary">Your account does not have access to the admin panel.</p>
        <CButton color="primary" onClick={signOut}>
          Sign out
        </CButton>
      </CContainer>
    )
  }

  return children
}

export default RequireRole
