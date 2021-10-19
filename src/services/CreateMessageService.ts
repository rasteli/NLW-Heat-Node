import prismaClient from "../prisma"
import Helper from "../utils/helper"

class CreateMessageService {
  async execute(text: string, user_id: string) {
    const message = await prismaClient.message.create({
      data: {
        text,
        user_id
      },
      include: {
        user: true
      }
    })

    Helper.setMessageInfo(message)

    return message
  }
}

export { CreateMessageService }
