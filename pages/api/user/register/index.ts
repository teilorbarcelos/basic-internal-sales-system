import { hash } from "bcryptjs"
import { NextApiRequest, NextApiResponse } from "next"
import { insertItem } from "../../../../utils/dbController"

export default async (
  req: NextApiRequest,
  resp: NextApiResponse
): Promise<void> => {

  if (req.method === 'POST') {

    const {
      login,
      password,
      password2
    }: {
      login: string
      password: string
      password2: string
    } = req.body

    if (login.indexOf(' ') != -1) {
      resp
        .status(400)
        .json({ error: `Login inválido!` })
      return
    }

    if (password.indexOf(' ') != -1 || password != password2) {
      resp
        .status(400)
        .json({ error: `As senhas não podem conter espaços e devem ser iguais!` })
      return
    }

    const passwordHash = await hash(password, 8)

    const response = await insertItem({ table: 'users', item: { login, passwordHash } })

    resp.status(201).json(response)
  } else {
    resp.status(400).json({ error: 'Wrong request method!' })
  }

}