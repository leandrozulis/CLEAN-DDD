import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { InMemoryAnswerCommentRepository } from 'test/repositories/in-memory-answer-comments-repository';
import { FetchAnswerCommentsUseCase } from './fetch-answer-comments';
import { makeAnswerComment } from 'test/factories/make-answer-comment';

let inMemoryAnswerCommentRepository: InMemoryAnswerCommentRepository;
let sut: FetchAnswerCommentsUseCase;

describe('Fetch Answer Comment', () => {

  beforeEach(() => {
    inMemoryAnswerCommentRepository = new InMemoryAnswerCommentRepository();
    sut = new FetchAnswerCommentsUseCase(inMemoryAnswerCommentRepository);
  });

  it('Shoul be able to fetch answer comment', async () => {

    await inMemoryAnswerCommentRepository.create(makeAnswerComment({ answerId: new UniqueEntityID('answer-1')}));
    await inMemoryAnswerCommentRepository.create(makeAnswerComment({ answerId: new UniqueEntityID('answer-1')}));
    await inMemoryAnswerCommentRepository.create(makeAnswerComment({ answerId: new UniqueEntityID('answer-1')}));

    const { answerComments } = await sut.execute({
      answerId: 'answer-1',
      page: 1
    });

    expect(answerComments).toHaveLength(3);
  });

  it('Shoul be able to fetch paginated answer comment', async () => {

    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswerCommentRepository.create(makeAnswerComment({ answerId: new UniqueEntityID('answer-1')}));
    }

    const { answerComments } = await sut.execute({
      answerId: 'answer-1',
      page: 2
    });

    expect(answerComments).toHaveLength(2);
  });
});
