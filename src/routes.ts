import { Router } from "express"
import { ensureAuthenticate } from "./middleware/ensureAuthenticated"
import { CreateMessageController } from "./controllers/CreateMessageController"
import { AuthenticateUserController } from "./controllers/AuthenticateUserController"
import { GetLast3MessagesController } from "./controllers/GetLast3MessagesController"
import { ProfileUserController } from "./controllers/ProfileUserController"

const routes = Router()

routes.post("/authenticate", new AuthenticateUserController().handle)
routes.get("/messages/last3", new GetLast3MessagesController().handle)
routes.get("/profile", ensureAuthenticate, new ProfileUserController().handle)

routes.post(
  "/messages",
  ensureAuthenticate,
  new CreateMessageController().handle
)

routes.get("/signin/callback", (request, response) => {
  const { code } = request.query

  return response.json({ code })
})

routes.get("/github", (request, response) => {
  response.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
  )
})

export default routes
