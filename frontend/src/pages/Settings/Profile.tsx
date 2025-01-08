import { Button, Form, Input, Select, Typography } from 'antd';
import React from 'react';
import { useUser } from '../../context/userContext';
import { useMutation } from '@tanstack/react-query';
import baseAxios from '../../axios/baseAxios';
import { toast } from 'react-toastify';
import axios from 'axios';
import { errorToast } from '../../utils/toast';
import { User } from '../../types/Login';

interface FormProps {
  id: string;
  name: string;
  email: string;
  subjectsIds: string[];
}

interface UpdateUser {
  id: string;
  name: string;
}

const ProfilePage = () => {
  const { user, setUser } = useUser();
  console.log('user', user);
  const [form] = Form.useForm<FormProps>();

  React.useEffect(() => {
    if (user) {
      form.setFieldsValue({
        id: user?.id,
        name: user?.name,
        email: user?.email,
        subjectsIds: user?.Subjects.map((subject) => subject.id),
      });
    }
  }, [user, form]);

  const { mutate } = useMutation({
    mutationKey: ['update_profile', user?.id],
    mutationFn: async ({ id, ...values }: UpdateUser) => {
      const response = await baseAxios.patch<User>(`/api/v1/users/${id}`, values);
      return response.data;
    },
    onSuccess: (data) => {
      setUser(data);
      toast.success('Profile updated successfully');
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
      layout="vertical"
      form={form}
      style={{
        height: '585px',
      }}
      wrapperCol={{
        span: 24,
        xxl: 12,
      }}
      onFinish={({ id, name }) => {
        mutate({
          id,
          name,
        });
      }}
    >
      <Typography.Title level={3}>Profile</Typography.Title>
      <Form.Item<FormProps> hidden name="id">
        <Input disabled />
      </Form.Item>
      <Form.Item<FormProps> label="Email" name="email">
        <Input disabled />
      </Form.Item>
      <Form.Item<FormProps>
        label="Name"
        name="name"
        required
        rules={[{ required: true, message: 'Please input your name!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FormProps> label="Subjects" name="subjectsIds">
        <Select mode="multiple" disabled>
          {user?.Subjects.map((subject) => (
            <Select.Option key={subject.id} value={subject.id}>
              {subject.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        shouldUpdate={(prevValues, currentValues) => prevValues.name !== currentValues.name}
      >
        {({ getFieldValue, isFieldsTouched }) => {
          const name = getFieldValue('name');

          // Check if both fields are filled and touched
          const formIsComplete = isFieldsTouched(['name'], true) && name !== user?.name && name;

          return (
            <Button type="primary" htmlType="submit" disabled={!formIsComplete} block>
              Update Profile
            </Button>
          );
        }}
      </Form.Item>
    </Form>
  );
};

export default ProfilePage;
