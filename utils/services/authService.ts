import { compare } from "bcryptjs"
import { sign, verify } from "jsonwebtoken"
import { selectItem } from "../dbController"

interface IAuthRequest {
  login: string
  password: string
}

interface IPayload {
  login: string
  sub: string
}

interface IUserResponse {
  _id: string
  login: string
  passwordHash: string
}

const secretMD5 = process.env.HASH_MD5 || 'd48296968f0b249f659bbf519747fb65'

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
        login: user.login
      }
    }

    return finalUser

  }
}

export { AuthService }