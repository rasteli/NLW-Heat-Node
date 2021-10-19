import { verify } from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"

interface IPayload {
  sub: string
}

export function ensureAuthenticate(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization //Bearer [token]

  if (!authToken) {
    return response.status(401).json({ errorCode: "token.invalid" })
  }

  const [, token] = authToken.split(" ") //comma ignores a value

  try {
    const { sub } = verify(token, process.env.JWT_SECRET_KEY) as IPayload

    request.user_id = sub

    return next()
  } catch {
    return response.status(401).json({ errorCode: "token.invalid" })
  }
}
