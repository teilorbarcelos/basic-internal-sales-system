import { NextApiRequest, NextApiResponse } from "next"
import { auth } from "../../../utils/middlewares/auth"

export default async (
  req: NextApiRequest,
  resp: NextApiResponse
): Promise<void> => {

  if (req.method === 'GET') {

    if (!req.headers.authorization || !auth(req.headers.authorization)) {
      return resp.status(401).json({ error: 'You are not logged!' })
    }

    resp.status(200).json({ success: 'You are logged!' })
  } else {
    resp.status(400).json({ error: 'Wrong request method!' })
  }

}