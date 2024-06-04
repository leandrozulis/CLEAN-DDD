import { Question } from '../../enterprise/entities/question';
import { QuestionsRepository } from '../repositories/questions-repository';

interface FetchRecentQuestionRequest {
  page: number
}

interface FetchRecentQuestionResponse {
  question: Question[]
}

export class FetchRecentQuestionUseCase {

  constructor(private questionsRepository : QuestionsRepository) {}

  async execute({ page }: FetchRecentQuestionRequest): Promise<FetchRecentQuestionResponse> {

    const question = await this.questionsRepository.findManyRecent({ page });

    return {
      question
    };
  }
}