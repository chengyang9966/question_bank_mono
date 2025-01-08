import { useQuery } from '@tanstack/react-query';
import baseAxios from '../axios/baseAxios';
import { UserSessionResponse } from '../types/UserSession';
import { useUser } from '../context/userContext';
import { Card, Col, Row, Skeleton, Tree, type TreeDataNode } from 'antd';
import SEO from '../components/SEO';

const QuizHistory = () => {
  const { user } = useUser();
  const defaultSubject = user?.Subjects[0];

  const { data: dataUserSession, isLoading: isLoadingUserSession } = useQuery({
    queryKey: ['userSession', defaultSubject?.id],
    queryFn: async () => {
      const response = await baseAxios.get<{
        data: UserSessionResponse[];
      }>(`/api/v2/user/session/${user?.id}`);
      return response.data.data;
    },
    enabled: !!defaultSubject?.id,
  });

  const treeData: TreeDataNode[] =
    dataUserSession
      ?.filter((x) => x.SessionQuestion.length > 0)
      ?.map((userSession) => {
        return {
          title: `Session ${
            userSession.UserSessionSummary.length > 0
              ? ` ${userSession.UserSessionSummary[0]?.correctAnswer} of ${userSession.UserSessionSummary[0]?.totalQuestions}`
              : ''
          }`,
          key: userSession.id,
          children: userSession.SessionQuestion.map((session) => {
            return {
              title: session.question.text,
              key: `${session.question.id}_${userSession.id}`,
              children: session.question.Answer.map((answer) => {
                const userAnswer = session.userAnswer.find((ans) => ans.id === answer.id);
                return {
                  title: answer.text,
                  key: `${session.question.id}_${userSession.id}_${answer.id}`,
                  selected: false,
                  style: {
                    color: userAnswer ? (answer.isCorrect ? 'green' : 'red') : 'grey',
                    fontWeight: userAnswer ? 'bold' : 'normal',
                  },
                };
              }),
            };
          }),
        };
      }) || [];

  if (isLoadingUserSession) return <Skeleton active paragraph={{ rows: 5 }} />;
  return (
    <>
      <SEO
        title="Question Bank: User Quiz History"
        description="
        Question Bank is a platform for learning where you can learn and practice questions from various subjects."
        name="Question Bank: User Quiz History"
        type="website"
      />
      <Row>
        <Col span={24} style={{ height: 800 }}>
          <Card title={`User Quiz (${dataUserSession?.length})`}>
            <Tree
              height={800}
              // checkable
              // defaultExpandedKeys={['0-0-0', '0-0-1']}
              // defaultSelectedKeys={['0-0-0', '0-0-1']}
              // defaultCheckedKeys={['0-0-0', '0-0-1']}
              // onSelect={onSelect}
              // onCheck={onCheck}
              treeData={treeData}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default QuizHistory;
