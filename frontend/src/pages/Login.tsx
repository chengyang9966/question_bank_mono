import React, { useEffect } from 'react';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import { useMutation } from '@tanstack/react-query';
import baseAxios from '../axios/baseAxios';
import { LoginTypeResponse } from '../types/Login';
import { useUser } from '../context/userContext';
import { useNavigate } from 'react-router';

type FieldType = {
  email?: string;
  password?: string;
  remember?: string;
};

const LoginPage: React.FC = () => {
  const { setUser, setToken } = useUser();
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationKey: ['login'],
    mutationFn: async (values: FieldType) => {
      const { remember, ...bodyData } = values;
      const response = await baseAxios.post<LoginTypeResponse>('/api/v1/auth/login', bodyData);
      return response.data;
    },
    onSuccess: (data, variable) => {
      if (variable.remember) {
        localStorage.setItem('remember', variable.remember);
        variable.email && localStorage.setItem('email', variable.email);
        variable.password && localStorage.setItem('password', btoa(variable.password));
      }
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
      navigate('/');
      // window.location.href = '/';
    },
  });

  useEffect(() => {
    if (localStorage.getItem('remember')) {
      const email = localStorage.getItem('email') || '';
      const password = atob(localStorage.getItem('password') || '');
      mutate({
        email,
        password,
        remember: 'true',
      });
    }
  }, []);
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
    mutate(values);
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item<FieldType>
        label="Email"
        name="email"
        rules={[
          { required: true, message: 'Please input your email!' },
          {
            type: 'email',
            message: 'Please enter a valid email',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item<FieldType> name="remember" valuePropName="checked" label={null}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginPage;
