import { NextApiRequest, NextApiResponse } from "next"
import { auth } from "../../../../utils/middlewares/auth"
import { AuthService } from "../../../../utils/services/authService"

export default async (
  req: NextApiRequest,
  resp: NextApiResponse
): Promise<void> => {

  if (req.method === 'POST') {

    if (req.headers.authorization && auth(req.headers.authorization)) {
      return resp.status(401).json({ error: 'You are already logged!' })
    }

    const {
      login,
      password
    }: {
      login: string
      password: string
    } = req.body

    const authService = new AuthService()

    const token = await authService.login({ login, password })

    if (!token) {
      resp.status(401).json({ error: 'Wrong login or password!' })
    }

    resp.status(201).json(token)

  } else {
    resp.status(400).json({ error: 'Wrong request method!' })
  }

}