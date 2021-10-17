import { Collection, MongoClient } from "mongodb"

interface ConnectType {
  collection: Collection
  client: MongoClient
}

const uri = process.env.DATABASE_URL || ''

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

export default async function connect(table: string): Promise<ConnectType> {

  if (!client.isConnected()) { await client.connect() }
  const collection = client.db(process.env.DATABASE_COLLECTION).collection(table)

  return { collection, client }
}