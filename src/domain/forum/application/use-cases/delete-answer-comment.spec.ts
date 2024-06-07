import { InMemoryAnswerCommentRepository } from 'test/repositories/in-memory-answer-comments-repository';
import { DeleteAnswerCommentUseCase } from './delete-answer-comment';
import { makeAnswerComment } from 'test/factories/make-answer-comment';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentRepository;
let sut: DeleteAnswerCommentUseCase;

describe('Delete Answer Comment', () => {

  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentRepository();
    sut = new DeleteAnswerCommentUseCase(inMemoryAnswerCommentsRepository);
  });

  it('Should be able to delete a answer Comment', async () => {

    const answerComment = makeAnswerComment();

    inMemoryAnswerCommentsRepository.create(answerComment);

    await sut.execute({
      answerCommentId: answerComment.id.toString(),
      authorId: answerComment.authorId.toString(),
    });
  
    expect(inMemoryAnswerCommentsRepository.items).toHaveLength(0);
  });

  it('Should not be able to delete another user answer Comment', async () => {

    const answerComment = makeAnswerComment({
      authorId: new UniqueEntityID('author-1')
    });

    inMemoryAnswerCommentsRepository.create(answerComment);

    expect(() => 
      sut.execute({
        answerCommentId: answerComment.id.toString(),
        authorId: 'author-2',
      })
    ).rejects.toBeInstanceOf(Error);

  });
});
