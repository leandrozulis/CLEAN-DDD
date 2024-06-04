
import { makeAnswer } from 'test/factories/make-answer';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { EditAnswerUseCase } from './edit-answer';
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';

let inMemoryAnswerRepository: InMemoryAnswersRepository;
let sut: EditAnswerUseCase;

describe('Edit Answer', () => {

  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswersRepository();
    sut = new EditAnswerUseCase(inMemoryAnswerRepository);
  });

  it('Should be able to edit a answer', async () => {

    const newAnswer = makeAnswer({
      authorId: new UniqueEntityID('author-1')
    }, new UniqueEntityID('answer-1'));    

    await inMemoryAnswerRepository.create(newAnswer);

    await sut.execute({
      authorId:'author-1',
      content: 'Conteúdo teste',
      answerId: newAnswer.id.toValue()
    });
  
    expect(inMemoryAnswerRepository.items[0]).toMatchObject({
      content: 'Conteúdo teste',
    });
  });

  it('Should not be able to edit a answer from another user', async () => {

    const newAnswer = makeAnswer({
      authorId: new UniqueEntityID('author-1')
    }, new UniqueEntityID('answer-1'));    

    await inMemoryAnswerRepository.create(newAnswer);

    expect(() => 
      sut.execute({
        answerId: newAnswer.id.toValue(),
        authorId:'author-2',
        content: 'Conteúdo teste'
      })
    ).rejects.toBeInstanceOf(Error);

  });
});
