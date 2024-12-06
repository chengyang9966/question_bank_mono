import { Button, Card, Col, Form, FormProps, Input, Row, Skeleton } from 'antd';
import { useUser } from '../context/userContext';
import { useMutation, useQuery } from '@tanstack/react-query';
import baseAxios from '../axios/baseAxios';
import { TaggingQuestionData } from '../types/Tagging';
import CheckBoxGroup from '../components/CheckBoxGroup';
import { useNavigate } from 'react-router';
import SEO from '../components/SEO';
import { UserSessionResponse } from '../types/UserSession';
import { Tree } from 'antd';
import type { TreeDataNode } from 'antd';

type SessionFieldType = {
  numberOfQuestions?: number;
  questionsTaggingId?: string[];
  mcq?: string[];
  difficulty?: string[];
};

const Dashboard = () => {
  const [form] = Form.useForm<SessionFieldType>();
  const { user } = useUser();
  const navigate = useNavigate();
  const defaultSubject = user?.Subjects[0];
  const { data, isLoading } = useQuery({
    queryKey: ['categories', defaultSubject?.id],
    queryFn: async () => {
      const response = await baseAxios.get<{
        data: TaggingQuestionData[];
      }>(`/api/v2/user/tagging/${defaultSubject?.id}`);
      return response.data.data;
    },
    enabled: !!defaultSubject?.id,
  });
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

  const { mutate } = useMutation({
    mutationKey: ['createSession'],
    mutationFn: async (values: SessionFieldType) => {
      const response = await baseAxios.post(`/api/v2/user/session/${user?.id}`, {
        ...values,
        questionsTaggingId: values.questionsTaggingId?.filter((w) => w !== 'All'),
        mcq: values.mcq?.filter((w) => w !== 'All'),
        difficulty: values.difficulty?.filter((w) => w !== 'All'),
      });
      return response.data;
    },
    onSuccess: (data) => {
      console.log(data);
      navigate(`/session/${data.id}`);
    },
  });

  const mcqOptions = [
    {
      label: 'All',
      value: 'All',
    },
    {
      label: 'MCQ Only',
      value: 'mcq',
    },
    {
      label: 'True & False',
      value: 't&f',
    },
  ];

  const difficultyOptions = [
    {
      label: 'All',
      value: 'All',
    },
    {
      label: 'Easy',
      value: '1',
    },
    {
      label: 'Hard',
      value: '2',
    },
  ];
  /**
   * @todo
   * 1. Get All CAtegories
   *
   */

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
  const onFinish: FormProps<SessionFieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
    mutate(values);
  };

  const onFinishFailed: FormProps<SessionFieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  if (isLoading || isLoadingUserSession) return <Skeleton active paragraph={{ rows: 5 }} />;
  return (
    <>
      <SEO
        title="Question Bank: User Dashboard"
        description="
        Question Bank is a platform for learning where you can learn and practice questions from various subjects."
        name="Question Bank: User Dashboard"
        type="website"
      />
      <Form
        form={form}
        name="session"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        initialValues={{
          numberOfQuestions: 100,
        }}
        //   initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Row gutter={[24, 10]}>
          <Col
            sm={{
              span: 24,
              order: 1,
            }}
            xs={{
              span: 24,
              order: 1,
            }}
            md={{
              span: 16,
              order: 1,
            }}
          >
            <Card title="Create Session">
              <Form.Item<SessionFieldType> name="questionsTaggingId" label="Chapters">
                <CheckBoxGroup
                  mcqOptions={[
                    {
                      label: 'All',
                      value: 'All',
                      sideText: `${data?.reduce(
                        (acc, tag) => acc + (tag.TotalQuestions - tag.userAnswerQuestions),
                        0,
                      )} of ${data?.reduce((acc, tag) => acc + tag.TotalQuestions, 0)}`,
                    },
                    ...(data?.map((tag) => {
                      return {
                        label: tag.tag,
                        value: tag.id,
                        sideText: `${Math.max(
                          tag.TotalQuestions - tag.userAnswerQuestions,
                          0,
                        )} of ${tag.TotalQuestions}`,
                      };
                    }) || []),
                  ]}
                  form={form}
                  field={'questionsTaggingId'}
                />
              </Form.Item>
              <Form.Item<SessionFieldType> name="numberOfQuestions" hidden>
                <Input type="number" placeholder="Number of Questions" value={100} hidden />
              </Form.Item>
              <Form.Item<SessionFieldType> name="mcq" label="Multiple Choose Only">
                <CheckBoxGroup mcqOptions={mcqOptions} form={form} field={'mcq'} />
              </Form.Item>
              <Form.Item<SessionFieldType> name="difficulty" label="Difficulty Level">
                <CheckBoxGroup mcqOptions={difficultyOptions} form={form} field={'difficulty'} />
              </Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Card>
          </Col>
          <Col
            md={{
              span: 8,
              order: 2,
            }}
            sm={{
              span: 24,
              order: 2,
            }}
            xs={{
              span: 24,
              order: 2,
            }}
          >
            <Card title={`User Session (${dataUserSession?.length})`}>
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
      </Form>
    </>
  );
};

export default Dashboard;
