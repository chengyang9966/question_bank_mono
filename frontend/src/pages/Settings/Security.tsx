import { Button, Form, Input, Typography } from 'antd';
import React from 'react';
import { useUser } from '../../context/userContext';
import { useMutation } from '@tanstack/react-query';
import baseAxios from '../../axios/baseAxios';
import { toast } from 'react-toastify';
import axios from 'axios';
import { errorToast } from '../../utils/toast';
import { useNavigate } from 'react-router';

interface FieldType {
  password: string;
  confirm: string;
  id: string;
}

interface UpdateUser {
  id: string;
  password: string;
}

interface UpdateUserResponse {
  id?: string;
}
const SecurityPage = () => {
  const { user, logout } = useUser();
  const [form] = Form.useForm<FieldType>();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user) {
      form.setFieldsValue({
        id: user?.id,
      });
    }
  }, [user, form]);

  const { mutate } = useMutation({
    mutationKey: ['update_password', user?.id],
    mutationFn: async ({ id, ...values }: UpdateUser) => {
      const response = await baseAxios.patch<UpdateUserResponse>(`/api/v1/users/${id}`, values);
      return response.data;
    },
    onSuccess: () => {
      toast.success('Password updated successfully');
      setTimeout(() => {
        logout();
        navigate('/login');
      }, 3000);
    },
    onError(error) {
      console.log('error', error);
      if (axios.isAxiosError(error)) {
        errorToast(error?.response?.data?.message);
      }
    },
  });

  return (
    <Form
      form={form}
      labelCol={{
        span: 24,
        xxl: 12,
      }}
      wrapperCol={{
        span: 24,
        xxl: 12,
      }}
      layout="vertical"
      style={{
        height: '585px',
      }}
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onFinish={({ confirm, ...values }) => {
        console.log('Success:', values);
        mutate(values);
      }}
    >
      <Typography.Title level={3}>Password</Typography.Title>
      <Form.Item<FieldType> hidden name="id">
        <Input disabled />
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
                return Promise.reject('Password should contain at least one number and one letter');
              }
              return Promise.resolve();
            },
          },
        ]}
      >
        <Input.Password placeholder="Enter Password" />
      </Form.Item>
      <Form.Item<FieldType>
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
              return Promise.reject(new Error('The new password that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password placeholder="Confirm Password" />
      </Form.Item>
      <Form.Item
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.password !== currentValues.password ||
          prevValues.confirm !== currentValues.confirm
        }
      >
        {({ getFieldValue, isFieldsTouched }) => {
          const password = getFieldValue('password');
          const confirm = getFieldValue('confirm');

          // Check if both fields are filled and touched
          const formIsComplete =
            isFieldsTouched(['password', 'confirm'], true) && password && confirm;

          return (
            <Button type="primary" htmlType="submit" disabled={!formIsComplete} block>
              Update Password
            </Button>
          );
        }}
      </Form.Item>
    </Form>
  );
};

export default SecurityPage;
