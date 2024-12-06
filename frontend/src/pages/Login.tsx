import React, { useEffect, useState } from 'react';
import type { FormProps } from 'antd';
import { Button, Checkbox, Col, Form, Input, Row, theme, Typography } from 'antd';
import { useMutation } from '@tanstack/react-query';
import baseAxios from '../axios/baseAxios';
import { LoginTypeResponse } from '../types/Login';
import { useUser } from '../context/userContext';
import { useNavigate } from 'react-router';
import { Title } from '../components/Title';
import { errorToast } from '../utils/toast';
import { useForm } from 'antd/es/form/Form';
import axios from 'axios';
import VerificationEmail from '../components/result/verificationEmail';

type FieldType = {
  email?: string;
  password?: string;
  remember?: string;
};

const LoginPage: React.FC = () => {
  const { setUser, setToken } = useUser();
  const navigate = useNavigate();
  const [form] = useForm<FieldType>();
  const [isVerifiedEmail, setIsVerifiedEmail] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { mutate, isPending } = useMutation({
    mutationKey: ['login'],
    mutationFn: async (values: FieldType) => {
      // eslint-disable-next-line
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
    onError(error) {
      console.log('error', error);
      if (axios.isAxiosError(error)) {
        if (error.response?.data?.message === 'email_not_verified') {
          setIsVerifiedEmail(true);
        } else {
          errorToast(error?.response?.data?.message);
        }
      }
    },
  });

  useEffect(() => {
    if (localStorage.getItem('remember')) {
      const email = localStorage.getItem('email') || '';
      const password = atob(localStorage.getItem('password') || '');
      form.setFieldsValue({
        email,
        password,
        remember: 'true',
      });
      // mutate({
      //   email,
      //   password,
      //   remember: 'true',
      // });
    }
    // eslint-disable-next-line
  }, []);
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
    mutate(values);
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  if (isVerifiedEmail) {
    return <VerificationEmail status="success" title="Verification Email Sent" />;
  }
  return (
    <div
      style={{
        backgroundColor: colorBgContainer,
        borderRadius: borderRadiusLG,
        padding: '20px',
        width: '400px',
        margin: 'auto',
        marginTop: '100px',
      }}
    >
      <Title title="Sign In" subTitle="Welcome back! Please enter your details" />
      <Form
        name="basic"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        form={form}
        onFinishFailed={onFinishFailed}
      >
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
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder="Enter Password" />
        </Form.Item>
        <Form.Item className="mb-3">
          <Form.Item<FieldType> name="remember" valuePropName="checked" label={null} noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <a className="float-right" title="Forget Password" href="">
            Forgot password
          </a>
        </Form.Item>
        <Button type="primary" htmlType="submit" block disabled={isPending}>
          Submit
        </Button>
        <div className="text-center">
          <Row justify={'center'} className="my-3 cursor-default">
            <Col span={11}>
              <div
                className=" bg-gray-300 mt-[6%] mr-1"
                style={{
                  height: '2px',
                }}
              ></div>
            </Col>
            <Col span={2}>OR</Col>
            <Col span={11}>
              <div
                className=" bg-gray-300 mt-[6%] ml-1"
                style={{
                  height: '2px',
                }}
              ></div>
            </Col>
          </Row>
          <Typography.Text type="secondary" className="cursor-default">
            Dont have an account?{' '}
          </Typography.Text>
          <a href="/register" title="Sign Up">
            Sign Up
          </a>
        </div>
      </Form>
    </div>
  );
};

export default LoginPage;
