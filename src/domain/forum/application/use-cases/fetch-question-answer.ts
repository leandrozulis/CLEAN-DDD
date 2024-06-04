import { Answer } from '../../enterprise/entities/answer';
import { AnswersRepository } from '../repositories/answers-repository';

interface FetchQuestionAnsersRequest {
  questionId: string
  page: number
}

interface FetchQuestionAnsersResponse {
  answer: Answer[]
}

export class FetchQuestionAnsersUseCase {

  constructor(private answersRepository : AnswersRepository) {}

  async execute({questionId, page }: FetchQuestionAnsersRequest): Promise<FetchQuestionAnsersResponse> {

    const answer = await this.answersRepository.findManyByQuestionId( questionId, { page });

    return {
      answer
    };
  }
}