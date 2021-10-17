import { MongoClient } from "mongodb"

interface NewUserProps {
  login: string
  passwordHash: string
}

interface InsertDataProps {
  table: string
  item: NewUserProps
}

export async function insertItem({ table, item }: InsertDataProps) {

  const url = process.env.DATABASE_URL || ''
  const client = new MongoClient(url)

  let response

  try {
    await client.connect()

    const db = client.db(process.env.DATABASE_COLLECTION)
    const col = db.collection(table)

    await col.insertOne(item)

    if (item.login) {
      response = await col.findOne({ login: item.login })
    }


  } catch (err) {
    console.log(err)
    return err
  }

  finally {
    await client.close()
    return response
  }
}