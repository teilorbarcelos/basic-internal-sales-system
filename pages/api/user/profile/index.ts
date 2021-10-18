import { NextApiRequest, NextApiResponse } from "next"
import { selectItem } from "../../../../utils/dbController"
import { auth } from "../../../../utils/middlewares/auth"
import { IUserResponse } from "../../../../utils/services/authService"

export default async (
  req: NextApiRequest,
  resp: NextApiResponse
): Promise<void> => {

  if (req.method === 'GET') {

    if (!req.headers.authorization || !auth(req.headers.authorization)) {
      return resp.status(401).json({ error: 'You are not logged!' })
    }

    const {
      login
    }: {
      login: string
    } = req.body

    const user = await selectItem({ table: 'users', item: { login } }) as IUserResponse

    resp.status(200).json(user)

  } else {
    resp.status(400).json({ error: 'Wrong request method!' })
  }

}