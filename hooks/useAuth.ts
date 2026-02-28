import { useState, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { resetSignup } from '@/redux/slices/authSlice';
import { loginUser, logoutUser, signupUser } from '@/api/auth';
import { useRouter } from 'next/navigation';
import {
  LoginFormState,
  SignupFieldErrors,
  SignupFormState,
} from '@/types/type';

export function useAuth() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  // removed useSearchParams

  const { loading, success, error, user } = useAppSelector((s) => s.auth);

  const [form, setForm] = useState<SignupFormState>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loginForm, setLoginForm] = useState<LoginFormState>({
    email: '',
    password: '',
  });

  const [fieldErrors, setFieldErrors] = useState<SignupFieldErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: '' }));
  }, []);

  const validate = useCallback((): boolean => {
    const errors: SignupFieldErrors = {};

    if (!form.username || form.username.length < 3)
      errors.username = 'Username must be at least 3 characters.';

    if (!/^\S+@\S+\.\S+$/.test(form.email))
      errors.email = 'Enter a valid email address.';

    if (form.password.length < 8)
      errors.password = 'Password must be at least 8 characters.';

    if (form.password !== form.confirmPassword)
      errors.confirmPassword = 'Passwords do not match.';

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }, [form]);

  const handleSubmit = useCallback(async () => {
    if (!validate()) return;
    await dispatch(
      signupUser({
        username: form.username,
        email: form.email,
        password: form.password,
      }),
    );
  }, [validate, dispatch, form]);

  const reset = useCallback(() => {
    dispatch(resetSignup());
    setForm({ username: '', email: '', password: '', confirmPassword: '' });
    setFieldErrors({});
  }, [dispatch]);

  const handleLoginChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setLoginForm((prev) => ({ ...prev, [name]: value }));
      setFieldErrors((prev) => ({ ...prev, [name]: '' }));
    },
    [],
  );

  const validateLogin = useCallback((): boolean => {
    const errors: Record<string, string> = {};

    if (!loginForm.email || !/^\S+@\S+\.\S+$/.test(loginForm.email))
      errors.email = 'Enter a valid email address.';

    if (!loginForm.password || loginForm.password.length < 1)
      errors.password = 'Password is required.';

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }, [loginForm]);

  const handleLoginSubmit = useCallback(async () => {
    if (!validateLogin()) return;

    const result = await dispatch(
      loginUser({
        email: loginForm.email,
        password: loginForm.password,
      }),
    );
    if (loginUser.fulfilled.match(result)) {
      router.push('/dashboard');  
    }
  }, [validateLogin, dispatch, loginForm, router]);

  const handleLogout = useCallback(async () => {
    await dispatch(logoutUser());
    router.push('/login');
  }, [dispatch, router]);

  return {
    form,
    loginForm,
    fieldErrors,
    showPassword,
    showConfirm,
    loading,
    success,
    serverError: error,
    handleChange,
    handleSubmit,
    togglePassword: () => setShowPassword((v) => !v),
    toggleConfirm: () => setShowConfirm((v) => !v),
    reset,
    handleLoginSubmit,
    handleLoginChange,
    handleLogout,
    currentUser: user,
  };
}
