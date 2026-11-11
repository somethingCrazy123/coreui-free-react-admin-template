import React from 'react'
import {
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useAuth } from '../../features/auth/useAuth'

const AppHeaderDropdown = () => {
  const { user, signOut } = useAuth()

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret>
        <CIcon icon={cilUser} className="me-2" />
        {user?.email}
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">Account</CDropdownHeader>
        <CDropdownItem disabled>Role: {user?.role}</CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem onClick={signOut}>
          <CIcon icon={cilLockLocked} className="me-2" />
          Sign out
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
