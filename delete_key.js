const { createClient } = require("redis");

// connect to redis
const client = createClient();

client.on("error", (err) => console.error("Redis Client Error", err));

async function run() {
  await client.connect();

  await client.set("tempData", "12345");
console.log(await client.get("tempData")); // "12345"

await client.del("tempData");
console.log(await client.get("tempData")); // null
}

run();
