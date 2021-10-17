import { verify } from "jsonwebtoken"
import { secretMD5 } from "../services/authService"

export function auth(token: string) {

  if (!token) {
    return false
  }

  const auth = token.replace('Bearer ', '')

  try {
    if (!verify(auth, secretMD5)) {
      return false
    }
  } catch (error) {
    return false
  }

  return true
}