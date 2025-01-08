import { Tabs, TabsProps } from 'antd';
import ProfilePage from './Profile';
import SecurityPage from './Security';

const SettingsPage = () => {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Profile',
      children: <ProfilePage />,
    },
    {
      key: '2',
      label: 'Security',
      children: <SecurityPage />,
    },
  ];

  const onChange = (key: string) => {
    console.log(key);
  };

  return <Tabs defaultActiveKey="1" tabPosition={'left'} items={items} onChange={onChange} />;
};

export default SettingsPage;
