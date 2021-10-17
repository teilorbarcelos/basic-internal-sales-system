import { MongoClient } from "mongodb"

interface NewUserProps {
  name: string
  login: string
  passwordHash: string
}

interface InsertDataProps {
  table: string
  item: NewUserProps
}

interface SelectDataProps {
  table: string
  item: {
    login?: string
  }
}

const url = process.env.DATABASE_URL || ''
const client = new MongoClient(url)
const db = client.db(process.env.DATABASE_COLLECTION)

export async function insertItem({ table, item }: InsertDataProps) {

  let response

  try {
    await client.connect()

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

export async function selectItem({ table, item }: SelectDataProps) {

  let response

  try {
    await client.connect()

    const col = db.collection(table)

    if (table == 'users') {
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