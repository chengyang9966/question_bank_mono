import { useMutation } from '@tanstack/react-query';
import { Button, Form, FormProps, Input, Rate, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import baseAxios from '../axios/baseAxios';
import { toast } from 'react-toastify';
import axios from 'axios';
import { errorToast } from '../utils/toast';
import { feedbackResponse } from '../types/Feedback';
import { useUser } from '../context/userContext';

interface FeedbackProps {
  questionId?: string;
}

interface FormFeedbackProps {
  feedback: string;
  rating: number;
  userId: string;
  questionId: string;
}
const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
const Feedback: React.FC<FeedbackProps> = ({ questionId }) => {
  const [form] = Form.useForm<FormFeedbackProps>();
  const { user } = useUser();
  const [isSubmitted, setIsSubmitted] = useState(false);
  useEffect(() => {
    if (questionId) {
      form.setFieldsValue({ questionId });
    }
    // eslint-disable-next-line
  }, [questionId]);

  useEffect(() => {
    if (user) {
      form.setFieldsValue({ userId: user.id });
    }
    // eslint-disable-next-line
  }, [user]);

  const { mutate, isPending } = useMutation({
    mutationKey: ['feedback'],
    mutationFn: async (values: FormFeedbackProps) => {
      const response = await baseAxios.post<feedbackResponse>('/api/v2/user/feedback', values);
      return response.data;
    },
    onSuccess: () => {
      toast.success('Feedback submitted successfully');
      setIsSubmitted(true);
    },
    onError(error) {
      console.log('error', error);
      if (axios.isAxiosError(error)) {
        errorToast(error?.response?.data?.message);
      }
    },
  });

  const onFinish: FormProps<FormFeedbackProps>['onFinish'] = (values) => {
    console.log('Success:', values);
    mutate(values);
  };
  const disabled = isSubmitted || isPending;
  if (!questionId) return null;

  return (
    <Form
      onFinish={onFinish}
      initialValues={{
        questionId,
        rating: 3,
      }}
      form={form}
    >
      <Typography.Text type="secondary">
        How was your experience with this question?
      </Typography.Text>
      <br />
      <Form.Item<FormFeedbackProps>
        name="feedback"
        rules={[{ required: true, message: 'Please input your feedback!' }]}
      >
        <Input.TextArea rows={4} disabled={disabled} />
      </Form.Item>
      <Form.Item<FormFeedbackProps> name="rating">
        <Rate tooltips={desc} disabled={disabled} />
        {/* <Flex gap="middle" vertical>
          {value ? <span>{desc[value - 1]}</span> : null}
        </Flex> */}
      </Form.Item>
      <Form.Item<FormFeedbackProps> name="userId" initialValue="123" hidden></Form.Item>
      <Form.Item<FormFeedbackProps> name="questionId" hidden></Form.Item>
      <Button type="primary" htmlType="submit" disabled={disabled}>
        Submit
      </Button>
    </Form>
  );
};

export default Feedback;
