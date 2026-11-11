import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react';
import { useAuth } from 'src/features/auth/useAuth';

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>Welcome</CCardHeader>
          <CCardBody>
            <p className="mb-1">
              Signed in as <strong>{user?.email}</strong>
            </p>
            <p className="text-body-secondary mb-0">
              Staff, vehicles, bookings, and live sessions will appear here.
            </p>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
}
