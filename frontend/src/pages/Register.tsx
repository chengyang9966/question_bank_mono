import React, { useState } from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input, theme, Typography } from 'antd';
import { useMutation } from '@tanstack/react-query';
import baseAxios from '../axios/baseAxios';
import { LoginTypeResponse } from '../types/Login';
import { useUser } from '../context/userContext';
import { Title } from '../components/Title';
import VerificationEmail from '../components/result/verificationEmail';
import axios from 'axios';
import { errorToast } from '../utils/toast';

type FieldType = {
  email?: string;
  name?: string;
  password?: string;
  confirm?: string;
};

const RegisterPage: React.FC = () => {
  const [isComplete, setIsComplete] = useState(false);
  const { setUser, setToken } = useUser();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { mutate, isPending } = useMutation({
    mutationKey: ['login'],
    mutationFn: async (values: FieldType) => {
      // eslint-disable-next-line
      const { confirm, ...bodyData } = values;
      const response = await baseAxios.post<LoginTypeResponse>('/api/v1/auth/register', bodyData);
      return response.data;
    },
    onSuccess: (data) => {
      if (data.tokens.access) {
        localStorage.setItem('accessToken', data.tokens.access.token);
      }
      if (data.tokens.refresh) {
        localStorage.setItem('refreshToken', data.tokens.refresh.token);
      }
      setUser(data.user);
      setToken(data.tokens);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('tokens', JSON.stringify(data.tokens));
      // window.location.href = '/';
      setIsComplete(true);
    },
    onError: (error) => {
      console.log('error', error);
      if (axios.isAxiosError(error)) {
        errorToast(error.response?.data?.message);
      }
    },
  });

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
    mutate(values);
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div
      style={{
        margin: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <div
        style={{
          backgroundColor: colorBgContainer,
          borderRadius: borderRadiusLG,
          padding: '20px',
          maxWidth: '400px',
        }}
      >
        {isComplete ? (
          <VerificationEmail
            status="success"
            title="Your account has been created successfully!"
            extra={
              <Button type="primary" href="/login">
                Back Home
              </Button>
            }
          />
        ) : (
          <div>
            <Title title="Sign Up" subTitle="Welcome! Please enter your details" />
            <Form
              name="basic"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item<FieldType>
                label="Name"
                name="name"
                className="mb-3"
                rules={[{ required: true, message: 'Please input your name!' }]}
              >
                <Input placeholder="Enter Name" />
              </Form.Item>
              <Form.Item<FieldType>
                label="Email"
                name="email"
                className="mb-3"
                rules={[
                  { required: true, message: 'Please input your email!' },
                  {
                    type: 'email',
                    message: 'Please enter a valid email',
                  },
                ]}
              >
                <Input placeholder="Enter Email" />
              </Form.Item>

              <Form.Item<FieldType>
                label="Password"
                name="password"
                className="mb-3"
                hasFeedback
                rules={[
                  { required: true, message: 'Please input your password!' },
                  {
                    min: 8,
                    message: 'Password should be minimum of 8 characters',
                  },
                  {
                    validator: (_, value) => {
                      if (!value || !value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
                        return Promise.reject(
                          'Password should contain at least one number and one letter',
                        );
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Input.Password placeholder="Enter Password" />
              </Form.Item>
              <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error('The new password that you entered do not match!'),
                      );
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Confirm Password" />
              </Form.Item>
              <Button type="primary" htmlType="submit" block className="my-3" disabled={isPending}>
                Submit
              </Button>
              <div className="text-center">
                <Typography.Text type="secondary" className="cursor-default">
                  Already have an account?{' '}
                </Typography.Text>
                <a href="/login" title="Sign In">
                  Sign In
                </a>
              </div>
            </Form>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
