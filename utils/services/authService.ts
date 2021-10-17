import { compare } from "bcryptjs"
import { Secret, sign, verify } from "jsonwebtoken"
import { selectItem } from "../dbController"

interface IAuthRequest {
  login: string
  password: string
}

interface IPayload {
  login: string
  sub: string
}

export interface IUserResponse {
  _id: string
  name: string
  login: string
  passwordHash: string
}

export const secretMD5 = process.env.HASH_MD5 as Secret

class AuthService {
  async login({ login, password }: IAuthRequest) {
    const user = await selectItem({ table: 'users', item: { login } }) as IUserResponse

    if (!user || !await compare(password, user.passwordHash)) {
      return false
    }

    const token = sign({ email: user.login }, secretMD5, { subject: user._id.toString(), expiresIn: '1d' })

    return {
      token,
      user: {
        _id: user._id,
        login: user.login
      }
    }
  }

  async verify(token: string) {
    const result = verify(token, secretMD5) as IPayload
    const login = result.login
    const user = await selectItem({ table: 'users', item: { login } }) as IUserResponse

    const finalUser = {
      token,
      user: {
        _id: user._id,
        name: user.name,
        login: user.login
      }
    }

    return finalUser

  }
}

export { AuthService }