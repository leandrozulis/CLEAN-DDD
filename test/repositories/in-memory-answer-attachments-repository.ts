import { AnswerAttachmentsRepository } from "@/domain/forum/application/repositories/answer-attachments-repository";
import { AnswerAttachment } from "@/domain/forum/enterprise/entities/answer-attachment";

export class InMemoryAnswerAttachmentsRepository implements AnswerAttachmentsRepository {
   
  public items: AnswerAttachment[] = [];

  async findManyByAnswerId(answerId: string) {
    const AnswerAttachments = this.items
      .filter(item => item.answerId.toString() === answerId)

    return AnswerAttachments;
  }

  async deleteManyByAnswerId(answerId: string) {
    const answerAttachments = this.items.filter(
      item => item.answerId.toString() !== answerId
    )

    this.items = answerAttachments
  }

}