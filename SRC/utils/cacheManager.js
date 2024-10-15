import { createClient } from "redis";

//const client =createClient('redis://127.0.0.1:6379')
const client = createClient({
   password: process.env.REDIS_PASS,
   socket: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT
   }
});
client.on('error', err => console.log('Redis Client Error', err))

export async function setValueOnCache({ key, value }) {
   if (client.isOpen == false) {
      await client.connect()
   }
   const data = await client.set(JSON.stringify(key), JSON.stringify(value))
   return data
}
export async function getDataFromCache({ key }) {

   if (client.isOpen === false) {
      await client.connect()
   }
   const data = await client.get(JSON.stringify(key))
   return data
}

export function clearCache(Key) {
   if (client.isOpen == false) {
      client.connect()
   }
   client.del(JSON.stringify(Key))
   client.disconnect();
}

