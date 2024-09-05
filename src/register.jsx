import React from 'react';
import { useRegisterForm } from './hooks/useRegister';
import RegisterView from './Views/RegisterView';

const Register = () => {
  const registerFormProps = useRegisterForm();

  return <RegisterView {...registerFormProps} />;
};

export default Register;
