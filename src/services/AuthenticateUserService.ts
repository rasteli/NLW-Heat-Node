import axios from "axios"
import { sign } from "jsonwebtoken"
import prismaClient from "../prisma"

interface IAccessToken {
  access_token: string
}

interface IUserResponse {
  id: number
  name: string
  login: string
  avatar_url: string
}

class AuthenticateUserService {
  async execute(code: string) {
    const url = "https://github.com/login/oauth/access_token"

    const { data: accessTokenResponse } = await axios.post<IAccessToken>(
      url,
      null,
      {
        params: {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code
        },

        headers: {
          Accept: "application/json"
        }
      }
    )

    const response = await axios.get<IUserResponse>(
      "https://api.github.com/user",
      {
        headers: {
          authorization: `Bearer ${accessTokenResponse.access_token}`
        }
      }
    )

    const { id, login, name, avatar_url } = response.data

    let user = await prismaClient.user.findFirst({
      where: {
        github_id: id
      }
    })

    if (!user) {
      user = await prismaClient.user.create({
        data: {
          name,
          login,
          avatar_url,
          github_id: id
        }
      })
    }

    const token = sign(
      {
        user: {
          id: user.id,
          name: user.name,
          avatar_url: user.avatar_url
        }
      },
      process.env.JWT_SECRET_KEY,
      {
        subject: user.id,
        expiresIn: "1d"
      }
    )

    return { token, user }
  }
}

export { AuthenticateUserService }
