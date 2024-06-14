import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { FetchRecentQuestionUseCase } from './fetch-recent-questions';
import { makeQuestion } from 'test/factories/make-question';
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let sut: FetchRecentQuestionUseCase;

describe('Fetch Recent Questions', () => {

  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository();
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(inMemoryQuestionAttachmentsRepository);
    sut = new FetchRecentQuestionUseCase(inMemoryQuestionsRepository);
  });

  it('Shoul be able to fetch recent questions', async () => {

    await inMemoryQuestionsRepository.create(makeQuestion({ createdAt: new Date(2022, 0, 20) }));
    await inMemoryQuestionsRepository.create(makeQuestion({ createdAt: new Date(2022, 0, 18) }));
    await inMemoryQuestionsRepository.create(makeQuestion({ createdAt: new Date(2022, 0, 23) }));

    const result = await sut.execute({
      page: 1
    });

    expect(result.value?.question).toEqual([
      expect.objectContaining({ createdAt: new Date(2022, 0, 23) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 20) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 18) })
    ]);
  });

  it('Shoul be able to fetch paginated recent questions', async () => {

    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionsRepository.create(makeQuestion());
    }

    const result = await sut.execute({
      page: 2
    });

    expect(result.value?.question).toHaveLength(2);
  });
});
