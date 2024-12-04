import { Result } from 'antd';
import { ResultStatusType } from 'antd/es/result';
import React from 'react';

interface VerificationEmailProps {
  extra?: React.ReactNode;
  status: ResultStatusType;
  title: string;
  subTitle?: string;
}

const VerificationEmail: React.FC<VerificationEmailProps> = ({
  extra,
  status,
  title,
  subTitle = 'Please check your email to verify your account.',
}) => {
  return <Result status={status} title={title} subTitle={subTitle} extra={extra} />;
};

export default VerificationEmail;
