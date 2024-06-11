import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { AnswerQuestionUseCase } from './answer-question';
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository';

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: AnswerQuestionUseCase;

describe('Create Answer Question', () => {

  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository = new InMemoryAnswerAttachmentsRepository();
    inMemoryAnswersRepository = new InMemoryAnswersRepository(inMemoryAnswerAttachmentsRepository);
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository);
  });
  
  test('Should be able to create an Answer Question', async () => {
  
    const result = await sut.execute({
      questionId: '1',
      instructorId: '1',
      content: 'Nova Resposta',
      attachmentsIds: ['1', '2']
    });
  
    expect(result.isRight()).toBe(true);
    expect(inMemoryAnswersRepository.items[0]).toEqual(result.value?.answer);
    expect(inMemoryAnswersRepository.items[0].attachments.currentItems).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityID('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityID('2') })
    ]);
  });
});
