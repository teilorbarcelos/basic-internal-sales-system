import { hash } from "bcryptjs"
import { NextApiRequest, NextApiResponse } from "next"
import { insertItem, selectItem } from "../../../../utils/dbController"
import { auth } from "../../../../utils/middlewares/auth"
import { IUserResponse } from "../../../../utils/services/authService"

export default async (
  req: NextApiRequest,
  resp: NextApiResponse
): Promise<void> => {

  if (req.method === 'POST') {

    // if (!req.headers.authorization || !auth(req.headers.authorization)) {
    //   return resp.status(401).json({ error: 'You are not logged!' })
    // }

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

    const userExists = await selectItem({ table: 'users', item: { login } }) as IUserResponse

    if (userExists) {
      resp
        .status(400)
        .json({ error: `Este login já existe, escolha um login diferente!` })
      return
    }

    const passwordHash = await hash(password, 8)

    const response = await insertItem({ table: 'users', item: { name, login, passwordHash } })

    resp.status(201).json(response)
  } else {
    resp.status(400).json({ error: 'Wrong request method!' })
  }

}