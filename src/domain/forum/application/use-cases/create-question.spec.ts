import { QuestionsRepository } from '../repositories/questions-repository';
import { Question } from '../../enterprise/entities/question';
import { CreateQuestionUseCase } from './create-question';

const fakeQuestionRepository: QuestionsRepository = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create: async (question: Question) => {
    return;
  }
};

test('create an answer', async () => {
  const createQuestion = new CreateQuestionUseCase(fakeQuestionRepository);

  const {question} = await createQuestion.execute({
    authorId: '1',
    title: '1',
    content: 'Nova Resposta'
  });

  expect(question.id).toBeTruthy();
});