import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import baseAxios from '../axios/baseAxios';
import { Button, Result } from 'antd';
import VerificationEmail from '../components/result/verificationEmail';

const VerifyEmailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isComplete, setIsComplete] = useState(false);
  const [isResendValidationEmail, setIsResendValidationEmail] = useState(false);

  const urlParams = new URLSearchParams(location.search);
  console.log(urlParams.get('token'));
  console.log(urlParams.get('email'));

  const { mutate, error } = useMutation({
    mutationKey: ['verify-email', urlParams.get('token')],

    mutationFn: async (token: string) => {
      const response = await baseAxios.post(`/api/v1/auth/verify-email?token=${token}`);
      return response.data;
    },
    onSuccess: () => {
      setIsComplete(true);
    },
  });

  const { mutate: SendVerifcationEmail } = useMutation({
    mutationKey: ['validate-email'],
    mutationFn: async (email: string) => {
      const response = await baseAxios.post(`/api/v1/auth/send-verification-email`, {
        email: email,
      });
      return response.data;
    },
    onSuccess: (data) => {
      console.log(data);
      setIsResendValidationEmail(true);
    },
  });

  React.useEffect(() => {
    if (urlParams.get('token')) {
      mutate(urlParams.get('token') || '');
    }
    // eslint-disable-next-line
  }, [urlParams.get('token')]);

  if (isComplete) {
    return (
      <Result
        status={'success'}
        title={'Email Verified'}
        subTitle={'You can now login with your account.'}
        extra={
          <Button type="primary" onClick={() => navigate('/login')}>
            Login
          </Button>
        }
      />
    );
  }
  if (error && !isResendValidationEmail) {
    return (
      <Result
        status={'error'}
        title={'Email Verification Failed'}
        subTitle={'Please try again later.'}
        extra={
          <Button type="primary" onClick={() => SendVerifcationEmail(urlParams.get('email') || '')}>
            Send Email Again
          </Button>
        }
      />
    );
  }
  if (isResendValidationEmail) {
    return (
      <VerificationEmail
        status="success"
        title="Verification Email Sent"
        extra={
          <Button type="primary" href="/login">
            Back Home
          </Button>
        }
      />
    );
  }
  return (
    <Result
      status="info"
      title="Verifying Email"
      subTitle="Please wait while we verify your email."
    />
  );
};

export default VerifyEmailPage;
