import { AnswerQuestionUseCase } from './answer-question';
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: AnswerQuestionUseCase;

describe('Create Answer Question', () => {

  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository);
  });
  
  test('Should be able to create an Answer Question', async () => {
  
    const { answer } = await sut.execute({
      questionId: '1',
      instructorId: '1',
      content: 'Nova Resposta'
    });
  
    expect(answer.content).toEqual('Nova Resposta');
    expect(inMemoryAnswersRepository.items[0].id).toEqual(answer.id);
  });
});
