import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { logo } from 'src/assets/brand/logo';
import { ApiError } from 'src/api/client';
import { authApi } from 'src/features/auth/auth.api';
import { loginSchema, type LoginInput } from 'src/features/auth/schemas';
import { useAuth } from 'src/features/auth/useAuth';

const ADMIN_ROLES = ['admin', 'staff'];

export default function AdminLoginPage() {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (values: LoginInput) => {
    try {
      const response = await authApi.login(values);

      if (!ADMIN_ROLES.includes(response.user.role)) {
        // Valid customer login, but this is the admin panel. Do not store the session.
        setError('root', { message: 'This account cannot sign in to the admin panel.' });
        return;
      }

      signIn(response);
      navigate('/dashboard', { replace: true });
    } catch (error) {
      if (error instanceof ApiError) {
        setError('root', { message: error.message });
      } else {
        setError('root', { message: 'Cannot reach the server. Is the backend running?' });
      }
    }
  };

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8} lg={6} xl={5}>
            <div className="d-flex flex-column gap-4">
              <div className="text-center">
                <CIcon icon={logo} height={48} />
              </div>
              <CCard className="p-4">
                <CCardBody className="d-flex flex-column gap-3">
                  <h2 className="h5 text-center mb-0">Staff and admin sign in</h2>

                  {errors.root && <CAlert color="danger" className="mb-0">{errors.root.message}</CAlert>}

                  <CForm className="row gy-3" onSubmit={handleSubmit(onSubmit)} noValidate>
                    <CCol xs={12}>
                      <CFormLabel htmlFor="email">Email address</CFormLabel>
                      <CFormInput
                        id="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@nrivehiclecare.com"
                        invalid={!!errors.email}
                        feedback={errors.email?.message}
                        {...register('email')}
                      />
                    </CCol>
                    <CCol xs={12}>
                      <CFormLabel htmlFor="password">Password</CFormLabel>
                      <CFormInput
                        id="password"
                        type="password"
                        autoComplete="current-password"
                        placeholder="Your password"
                        invalid={!!errors.password}
                        feedback={errors.password?.message}
                        {...register('password')}
                      />
                    </CCol>
                    <CCol xs={12}>
                      <CButton color="primary" type="submit" className="w-100" disabled={isSubmitting}>
                        {isSubmitting ? 'Signing in...' : 'Sign in'}
                      </CButton>
                    </CCol>
                  </CForm>
                </CCardBody>
              </CCard>
            </div>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
}
