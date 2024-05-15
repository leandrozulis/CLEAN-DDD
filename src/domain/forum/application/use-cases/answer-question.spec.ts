import { AnswerQuestionUseCase } from './answer-question';
import { AnswersRepository } from '../repositories/answers-repository';
import { Answer } from '@/domain/forum/enterprise/entities/answer';

const fakeAnswersRepository: AnswersRepository = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    create: async (answer: Answer) => {
        return;
    }
};

test('create an answer', async () => {
    const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository);

    const answer = await answerQuestion.execute({
        questionId: '1',
        instructorId: '1',
        content: 'Nova Resposta'
    });

    expect(answer.content).toEqual('Nova Resposta');
});