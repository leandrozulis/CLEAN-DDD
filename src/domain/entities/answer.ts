import { randomUUID } from "node:crypto"

interface AnswerProps {
  content: string
  authorId: string
  questionId: string
}

export class Answer {
  public id: string
  public content: string
  public authorId: string
  public questionId: string

  constructor(answer: AnswerProps, id?: string) {
    this.content = answer.content
    this.authorId = answer.authorId
    this.questionId = answer.questionId
    this.id = id ?? randomUUID()
  }
}