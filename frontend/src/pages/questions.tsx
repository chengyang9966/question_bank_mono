import { useMutation, useQuery } from '@tanstack/react-query';
import baseAxios from '../axios/baseAxios';
import { UserSessionResponse } from '../types/UserSession';
import QuestionCard from '../components/questionCard';
import { useEffect, useState } from 'react';
import { Button, Col, Modal, Pagination, Progress, Result, Row, Typography } from 'antd';
import { useNavigate, useParams } from 'react-router';
import { useUser } from '../context/userContext';
import { successToast, warningToast } from '../utils/toast';
import { QuestionSessionAnswerResponse } from '../types/QuestionSession';
import { SmileOutlined } from '@ant-design/icons';

const QuestionsPage = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showCompleteModel, setShowCompleteModel] = useState<boolean>(false);
  const [correctAnswer, setCorrectAnswer] = useState<Record<string, string[]>>({});
  const [completedQuestionsIds, setCompletedQuestionsIds] = useState<string[]>([]);
  const [answerStatistic, setAnswerStatistic] = useState<Record<string, Record<string, number>>>(
    {},
  );
  console.log('🚀 ~ QuestionsPage ~ answerStatistic:', answerStatistic);
  const navigate = useNavigate();
  const { sessionId } = useParams();
  const { user } = useUser();
  const { data, isLoading } = useQuery({
    queryKey: ['questions', sessionId],
    queryFn: async () => {
      const response = await baseAxios.get<{
        data: UserSessionResponse[];
      }>(`/api/v2/user/question/${sessionId}`);
      return response.data.data;
    },
    enabled: !!sessionId,
  });
  const { mutate } = useMutation({
    mutationKey: ['submitAnswer'],
    mutationFn: async (values: { questionId: string; sessionId: string; answerIds: string[] }) => {
      const response = await baseAxios.put<{
        data: QuestionSessionAnswerResponse;
      }>(`/api/v2/user/session/${user?.id}`, values);
      return response.data.data;
    },
    onSuccess: (data, variables) => {
      console.log(data);
      const answerStats = Object.keys(data.answerStatistic).reduce((acc, x) => {
        const count = data.answerStatistic[x];
        return {
          ...acc,
          [x]: (count / data.questionStatistic.totalAttempts) * 100,
        };
      }, data.answerStatistic);
      setAnswerStatistic((prev) => ({
        ...prev,
        [variables.questionId]: answerStats,
      }));
      setCorrectAnswer((prev) => ({
        ...prev,
        [variables.questionId]: data.correctAnswer.map((x) => x.id),
      }));
      setCompletedQuestionsIds((completedQuestionsIds) => [
        ...completedQuestionsIds,
        variables.questionId,
      ]);
      if (data.correctAnswer.map((x) => x.id).includes(variables.answerIds[0])) {
        successToast('Correct Answer');
        // navigate(`/session/${data.id}`);
      } else {
        warningToast('Wrong Answer');
      }
    },
  });

  useEffect(() => {
    if (completedQuestionsIds.length === data?.[0]?.SessionQuestion.length) {
      setTimeout(() => {
        setShowCompleteModel(true);
      }, 3000);
    }
    // eslint-disable-next-line
  }, [JSON.stringify(completedQuestionsIds)]);

  const submitAnswer = () => {
    const questionId = data?.[0]?.SessionQuestion[selectedIndex].question.id;
    const sessionId = data?.[0].id;
    const answerIds = [selectedAnswer];
    if (!questionId || !sessionId || !selectedAnswer) return;
    mutate({ questionId, sessionId, answerIds });
  };
  const totalQuestions = data?.[0].SessionQuestion.length || 0;
  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      <Row justify={'center'} align="middle">
        <Col
          xs={{
            span: 24,
            order: 2,
          }}
          md={{
            span: 24,
            order: 2,
          }}
          lg={{
            span: 16,
            order: 1,
          }}
        >
          {data
            ?.filter((_, index) => index === 0)
            .map((session) => {
              return session.SessionQuestion.filter((_, index) => index === selectedIndex).map(
                (question) => {
                  return (
                    <QuestionCard
                      key={question.question.id}
                      question={question.question}
                      selectedAnswer={selectedAnswer}
                      setSelectedAnswer={setSelectedAnswer}
                      submitAnswer={submitAnswer}
                      answerStatistic={answerStatistic}
                      correctAnswer={correctAnswer}
                      completedQuestionsIds={completedQuestionsIds}
                      userAnswer={question.userAnswer}
                    />
                  );
                },
              );
            })}
        </Col>
        <Col
          xs={{
            span: 24,
          }}
          md={{
            span: 8,
            order: 1,
          }}
          style={{ textAlign: 'center' }}
        >
          <Progress
            percent={((selectedIndex + 1) / totalQuestions) * 100}
            format={() => {
              return `${selectedIndex + 1}/ ${totalQuestions}`;
            }}
            type="circle"
          />
        </Col>
      </Row>

      <div className="my-5">
        <Row>
          <Col span={24}>
            <Pagination
              // itemRender={(current, type, originalElement) => {
              //   if (type === 'prev') {
              //     return <Button>Prev</Button>;
              //   }
              //   if (type === 'next') {
              //     return <Button>Next</Button>;
              //   }
              //   return originalElement;
              // }}
              prevIcon={<Button>Prev</Button>}
              nextIcon={<Button>Next</Button>}
              defaultCurrent={selectedIndex + 1}
              current={selectedIndex + 1}
              pageSize={1}
              total={totalQuestions}
              showSizeChanger={false}
              onChange={(page) => {
                setSelectedIndex(page - 1);
              }}
              style={{ textAlign: 'center' }}
            />
          </Col>
        </Row>
      </div>

      <div className="my-4">
        {data?.[0]?.SessionQuestion.filter(
          (data, index) =>
            index === selectedIndex &&
            (completedQuestionsIds.includes(data.question.id) || data.userAnswer.length > 0),
        ).map((question) => {
          return question.question?.Reference?.sort((a, b) => a.sequence - b.sequence).map((x) => {
            return (
              <Typography.Text
                type="secondary"
                strong
                style={{
                  fontSize: '1.2rem',
                }}
              >
                {x.description}
              </Typography.Text>
            );
          });
        })}
      </div>
      <Modal visible={showCompleteModel} title="Congratulations" footer={null} onCancel={() => {}}>
        <Result
          title="All Questions has been Answered"
          icon={<SmileOutlined />}
          extra={
            <>
              {data?.[0]?.SessionQuestion.map((question, index) => {
                const answerData = correctAnswer[question.question.id];
                console.log('🚀 ~ {data?.[0]?.SessionQuestion.map ~ answerData:', {
                  answerData,
                  completedQuestionsIds,
                });

                return (
                  <Row style={{ textAlign: 'start' }}>
                    <Col span={24}>
                      <Typography.Text type="secondary">
                        {`${index + 1}.` + question.question.text}
                      </Typography.Text>
                    </Col>
                    <Col span={23} offset={1}>
                      <Typography.Text type="secondary" strong>
                        {
                          question.question.Answer.find(
                            (x) => x.id === (answerData?.length > 0 ? answerData[0] : ''),
                          )?.text
                        }
                      </Typography.Text>
                    </Col>
                  </Row>
                );
              })}
              <Row style={{ justifyContent: 'center', marginTop: 10 }}>
                <Button
                  type="primary"
                  key="console"
                  onClick={() => {
                    navigate(`/`);
                  }}
                >
                  Go To Dashboard
                </Button>
              </Row>
            </>
          }
        />
      </Modal>
    </div>
  );
};

export default QuestionsPage;
