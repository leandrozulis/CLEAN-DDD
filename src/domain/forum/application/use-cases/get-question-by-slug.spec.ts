import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { GetQuestionBySlug } from './get-question-by-slug';
import { makeQuestion } from 'test/factories/make-question';
import { Slug } from '../../enterprise/entities/value-objects/slug';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: GetQuestionBySlug;

describe('Get Question By Slug', () => {

  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new GetQuestionBySlug(inMemoryQuestionsRepository);
  });

  it('Shoul be able to get a question by slug', async () => {

    const newQuestion = makeQuestion({
      slug: Slug.create('example-question')
    });

    inMemoryQuestionsRepository.create(newQuestion);
      
    const result = await sut.execute({
      slug: 'example-question'
    });
  
    expect(result.value?.question.id).toBeTruthy();
    expect(result.value?.question.title).toEqual(newQuestion.title);
  });
});
