import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { makeQuestion } from 'test/factories/make-question';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { EditQuestionUseCase } from './edit-question';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: EditQuestionUseCase;

describe('Edit Question', () => {

  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository);
  });

  it('Should be able to edit a question', async () => {

    const newQuestion = makeQuestion({
      authorId: new UniqueEntityID('author-1')
    }, new UniqueEntityID('question-1'));    

    await inMemoryQuestionsRepository.create(newQuestion);

    await sut.execute({
      authorId:'author-1',
      title: 'Pergunta teste',
      content: 'Conteúdo teste',
      questionId: newQuestion.id.toValue()
    });
  
    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: 'Pergunta teste',
      content: 'Conteúdo teste',
    });
  });

  it('Should not be able to edit a question from another user', async () => {

    const newQuestion = makeQuestion({
      authorId: new UniqueEntityID('author-1')
    }, new UniqueEntityID('question-1'));    

    await inMemoryQuestionsRepository.create(newQuestion);

    expect(() => 
      sut.execute({
        questionId: newQuestion.id.toValue(),
        authorId:'author-2',
        title: 'Pergunta teste',
        content: 'Conteúdo teste'
      })
    ).rejects.toBeInstanceOf(Error);

  });
});