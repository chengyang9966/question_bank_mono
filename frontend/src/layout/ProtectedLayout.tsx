import { Layout, Menu, Skeleton, theme } from 'antd';
import { Navigate, Outlet } from 'react-router';
import { useUser } from '../context/userContext';

const ProtectedLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { token, user, loading } = useUser();
  console.log('🚀 ~ ProtectedLayout ~ token:', {
    token,
    user,
  });

  const { Content, Footer, Header } = Layout;
  // const items = new Array(3).fill(null).map((_, index) => ({
  //   key: index + 1,
  //   label: `nav ${index + 1}`,
  // }));

  const userMenu = [
    {
      label: user?.name,
      key: '1',
      onClick: () => {
        console.log('User Profile');
      },
      children: [
        {
          label: 'Settings',
          key: '1.1',
          onClick: () => {
            console.log('Settings');
          },
        },
        {
          label: 'Logout',
          key: '1.2',
          onClick: () => {
            console.log('Logout');
          },
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
      <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={[]}
          style={{ flex: 1, minWidth: 0 }}
        />
        <Menu theme="dark" mode="horizontal" items={userMenu} />
      </Header>
      <Content style={{ padding: '0 48px', paddingTop: '48px' }}>
        <div
          style={{
            background: colorBgContainer,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Tech DevX Solutions ©{new Date().getFullYear()} Created by Tech DevX
      </Footer>
    </Layout>
  );
};

export default ProtectedLayout;
