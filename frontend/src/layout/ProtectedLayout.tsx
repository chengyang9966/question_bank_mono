import { Layout, Menu, Modal, Skeleton, theme, Typography } from 'antd';
import { Navigate, Outlet, useNavigate } from 'react-router';
import { useUser } from '../context/userContext';
import { useMutation } from '@tanstack/react-query';
import baseAxios from '../axios/baseAxios';
import { toast } from 'react-toastify';
import { useState } from 'react';

const ProtectedLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { token, user, loading } = useUser();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { Content, Footer, Header } = Layout;
  // const items = new Array(3).fill(null).map((_, index) => ({
  //   key: index + 1,
  //   label: `nav ${index + 1}`,
  // }));
  const { mutate } = useMutation({
    mutationKey: ['logout'],
    mutationFn: async () => {
      baseAxios.post('/api/v1/auth/logout', {
        refreshToken: token?.refresh.token,
      });
    },
    onSuccess: () => {
      toast.success('Logout successful');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('tokens');

      navigate('/login');
    },
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    mutate();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const userMenu = [
    {
      label: user?.name || 'User Profile',
      key: '1',
      onClick: () => {
        console.log('User Profile');
      },
      children: [
        {
          label: 'Quiz History',
          key: '1.2',
          onClick: () => {
            navigate('/user-quiz');
          },
        },
        {
          label: 'Settings',
          key: '1.1',
          onClick: () => {
            navigate('/settings');
          },
        },
        {
          label: 'Logout',
          key: '1.3',
          onClick: showModal,
        },
      ],
    },
  ];

  if (loading) {
    return <Skeleton active paragraph={{ rows: 5 }} />; // Display a loader while the context is loading
  }
  if (!user || !token) return <Navigate to="/login" />;
  return (
    <Layout>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div
          className="logo"
          style={{
            borderRadius: borderRadiusLG,
            background: colorBgContainer,
            height: 32,
            width: 32,
          }}
          onClick={() => {
            navigate('/');
          }}
        />

        <Menu theme="dark" mode="horizontal" items={userMenu} />
      </Header>
      <Content style={{ padding: '0 48px', paddingTop: '48px' }}>
        <div
          style={{
            background: colorBgContainer,
            padding: 24,
            borderRadius: borderRadiusLG,
            minHeight: 280,
          }}
        >
          <Outlet />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Tech DevX Solutions ©{new Date().getFullYear()} Created by Tech DevX
      </Footer>
      <Modal title="Logout" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Typography.Text type="secondary">Do you want to Logout?</Typography.Text>
      </Modal>
    </Layout>
  );
};

export default ProtectedLayout;
