import { Layout, Menu, theme } from 'antd';
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
  const items = new Array(3).fill(null).map((_, index) => ({
    key: index + 1,
    label: `nav ${index + 1}`,
  }));
  if (loading) {
    return <div>Loading...</div>; // Display a loader while the context is loading
  }
  if (!user || !token) return <Navigate to="/login" />;
  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={items}
          style={{ flex: 1, minWidth: 0 }}
        />
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
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default ProtectedLayout;
