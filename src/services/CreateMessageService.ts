import prismaClient from "../prisma"
import { io } from "../app"

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

    io.emit("new_message", message)

    return message
  }
}

export { CreateMessageService }
