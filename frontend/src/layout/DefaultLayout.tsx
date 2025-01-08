import { Layout } from 'antd';
import { Outlet } from 'react-router';

const DefaultLayout = () => {
  const { Content } = Layout;
  return (
    <Layout style={{ height: '100vh' }}>
      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default DefaultLayout;
