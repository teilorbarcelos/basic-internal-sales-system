import { NextApiRequest, NextApiResponse } from "next"
import { deleteItem } from "../../../../utils/dbController"
import { auth } from "../../../../utils/middlewares/auth"

export default async (
  req: NextApiRequest,
  resp: NextApiResponse
): Promise<void> => {

  if (req.method === 'POST') {

    if (!req.headers.authorization || !auth(req.headers.authorization)) {
      return resp.status(401).json({ error: 'You are not logged!' })
    }

    const {
      login
    }: {
      login: string
    } = req.body

    if (login == 'admin') {
      return resp.status(400).json({ error: 'This user cant be removed!' })
    }

    const users = await deleteItem({ table: 'users', item: { login } })

    resp.status(200).json(users)

  } else {
    resp.status(400).json({ error: 'Wrong request method!' })
  }

}