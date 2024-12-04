import { Layout } from 'antd';
import { Outlet } from 'react-router';

const DefaultLayout = () => {
  const { Content } = Layout;
  return (
    <Layout>
      <Content className="h-dvh p-10">
        <Outlet />
      </Content>
    </Layout>
  );
};

export default DefaultLayout;
