import { Button, Col, Flex, Row, theme, Typography } from 'antd';
import { Question, UserAnswer } from '../types/UserSession';
import { CheckOutlined } from '@ant-design/icons';

const QuestionCard = ({
  question,
  selectedAnswer,
  setSelectedAnswer,
  submitAnswer,
  answerStatistic,
  correctAnswer,
  completedQuestionsIds,
  userAnswer,
}: {
  question: Question;
  selectedAnswer: string;
  setSelectedAnswer: React.Dispatch<React.SetStateAction<string>>;
  submitAnswer: () => void;
  answerStatistic: Record<string, Record<string, number>>;
  correctAnswer: Record<string, string[]>;
  completedQuestionsIds: string[];
  userAnswer: UserAnswer[];
}) => {
  console.log('🚀 ~ completedQuestionsIds:', completedQuestionsIds);
  const {
    token: { colorSuccess, colorError, colorPrimary },
  } = theme.useToken();
  return (
    <div>
      <Typography.Title level={4} className="my-2">
        {question.text}
      </Typography.Title>
      <Row
        gutter={[
          0,
          {
            xs: 8,
            sm: 10,
            md: 12,
          },
        ]}
        align={'middle'}
        justify={'center'}
      >
        {question.Answer.map((answer, index) => {
          const answerStats = answerStatistic[question.id]?.[answer.id] || 0;
          const userAnswerData = userAnswer.find((ans) => ans.id === answer.id);
          return (
            <Col
              key={index}
              className="gutter-row"
              xs={{
                span: 24,
              }}
              sm={{ span: 24 }}
              md={{ span: 24 }}
            >
              <Button
                key={answer.id}
                id={answer.id}
                onClick={() => {
                  setSelectedAnswer(answer.id);
                }}
                block
                disabled={completedQuestionsIds.includes(question.id) || userAnswer.length > 0}
                style={
                  correctAnswer[question.id]?.includes(answer.id) ||
                  (userAnswerData && userAnswerData?.isCorrect)
                    ? {
                        backgroundColor: colorSuccess,
                        color: answer.id === selectedAnswer ? 'black' : 'white',
                      }
                    : (correctAnswer[question.id]?.length > 0 && answer.id === selectedAnswer) ||
                      (userAnswerData && !userAnswerData?.isCorrect)
                    ? {
                        backgroundColor: colorError,
                        color: 'white',
                        opacity: 0.8,
                      }
                    : answer.id === selectedAnswer
                    ? {
                        backgroundColor: colorPrimary,
                        color: 'white',
                      }
                    : {
                        backgroundColor: 'white',
                        color: colorPrimary,
                      }
                }
              >
                {answer.text}
                {correctAnswer[question.id]?.includes(answer.id) && (
                  <CheckOutlined style={{ fontSize: '18px', fontWeight: 'bold' }} />
                )}
              </Button>
              <Flex justify={'center'}>
                <Typography.Text
                  type="secondary"
                  hidden={!completedQuestionsIds.includes(question.id)}
                >
                  {answerStats.toFixed(0)}% {answerStats === 1 ? 'person' : 'people'} answered this
                </Typography.Text>
              </Flex>
            </Col>
          );
        })}
      </Row>
      <Row style={{ marginTop: '16px' }}>
        <Col span={24}>
          <Button
            type="primary"
            block
            onClick={submitAnswer}
            disabled={completedQuestionsIds.includes(question.id) || userAnswer.length > 0}
          >
            Submit
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default QuestionCard;
