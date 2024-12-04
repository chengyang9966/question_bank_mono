import { Typography } from 'antd';

interface TitleProps {
  title: string;
  subTitle?: string;
}

export const Title: React.FC<TitleProps> = ({ title, subTitle }) => {
  return (
    <div>
      <Typography.Title
        level={2}
        className={`text-center`}
        style={subTitle ? { marginBottom: 6 } : {}}
      >
        {title}
      </Typography.Title>
      {subTitle && (
        <Typography.Text className="text-center block" type="secondary">
          {subTitle}
        </Typography.Text>
      )}
    </div>
  );
};
