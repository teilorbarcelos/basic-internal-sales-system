import { hash } from "bcryptjs"
import { NextApiRequest, NextApiResponse } from "next"
import connect from "../../../../utils/db"

interface ErrorResponseType {
  error: string
}

interface SuccessResponseType {
  _id: string
  login: string
}

export default async (
  req: NextApiRequest,
  resp: NextApiResponse<ErrorResponseType | SuccessResponseType>
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

    if (login.trim() == '') {
      resp
        .status(400)
        .json({ error: `Login inválido!` })
      return
    }

    if (password != password2) {
      resp
        .status(400)
        .json({ error: `As senhas informadas são diferentes!` })
      return
    }

    const { collection } = await connect('users')

    const lowerCaseLogin = login.toLowerCase()
    const loginAlreadyExists = await collection.findOne({ login: lowerCaseLogin })

    if (loginAlreadyExists) {
      resp
        .status(400)
        .json({ error: `Login ${lowerCaseLogin} already registered!` })
      return
    }

    const passwordHash = await hash(password, 8)

    const response = await collection.insertOne({
      login,
      passwordHash
    })

    resp.status(201).json(response.ops[0])
  } else {
    resp.status(400).json({ error: 'Wrong request method!' })
  }

}