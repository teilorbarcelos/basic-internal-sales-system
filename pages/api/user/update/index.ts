import { hash } from "bcryptjs"
import { UpdateResult } from "mongodb"
import { NextApiRequest, NextApiResponse } from "next"
import { updateItem } from "../../../../utils/dbController"
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
      name,
      login,
      password,
      password2
    }: {
      name: string
      login: string
      password: string
      password2: string
    } = req.body

    if (password.indexOf(' ') != -1 || password != password2) {
      resp
        .status(400)
        .json({ error: `As senhas não podem conter espaços e devem ser iguais!` })
      return
    }

    const passwordHash = await hash(password, 8)

    const response = await updateItem({ table: 'users', item: { name, login, passwordHash } }) as UpdateResult

    if (response.modifiedCount > 0) {
      return resp.status(200).json({ success: 'Registro atualizado com sucesso!' })
    }

    resp.status(400).json({ error: 'Não foi possível atualizar o registro!' })
  } else {
    resp.status(400).json({ error: 'Wrong request method!' })
  }

}