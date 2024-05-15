import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { GetQuestionBySlug } from './get-question-by-slug';
import { Question } from '../../enterprise/entities/question';
import { Slug } from '../../enterprise/entities/value-objects/slug';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: GetQuestionBySlug;

describe('Get Question By Slug', () => {

  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new GetQuestionBySlug(inMemoryQuestionsRepository);
  });

  it('Shoul be able to get a question by slug', async () => {

    const newQuestion = Question.create({
      authorId: new UniqueEntityID(),
      title: 'Example question',
      slug: Slug.create('example-question'),
      content: 'Example content'
    });

    inMemoryQuestionsRepository.create(newQuestion);
      
    const {question} = await sut.execute({
      slug: 'example-question'
    });
  
    expect(question.id).toBeTruthy();
    expect(question.title).toEqual(newQuestion.title);
  });
});
