import { FetchQuestionAnsersUseCase } from './fetch-question-answer';
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';
import { makeAnswer } from 'test/factories/make-answer';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: FetchQuestionAnsersUseCase;

describe('Fetch Question Answers', () => {

  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new FetchQuestionAnsersUseCase(inMemoryAnswersRepository);
  });

  it('Shoul be able to fetch question answers', async () => {

    await inMemoryAnswersRepository.create(makeAnswer({ questionId: new UniqueEntityID('question-1')}));
    await inMemoryAnswersRepository.create(makeAnswer({ questionId: new UniqueEntityID('question-1')}));
    await inMemoryAnswersRepository.create(makeAnswer({ questionId: new UniqueEntityID('question-1')}));

    const result = await sut.execute({
      questionId: 'question-1',
      page: 1
    });

    expect(result.value?.answer).toHaveLength(3);
  });

  it('Shoul be able to fetch paginated question answers', async () => {

    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswersRepository.create(makeAnswer({ questionId: new UniqueEntityID('question-1')}));
    }

    const result = await sut.execute({
      questionId: 'question-1',
      page: 2
    });

    expect(result.value?.answer).toHaveLength(2);
  });
});
