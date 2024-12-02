import { Layout } from 'antd';
import React from 'react';
import { Outlet } from 'react-router';

const DefaultLayout = () => {
  const { Content, Footer, Header } = Layout;
  return (
    <Layout>
      <Content
        style={{ height: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Outlet />
      </Content>
    </Layout>
  );
};

export default DefaultLayout;
