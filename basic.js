const { createClient } = require("redis");

// connect to redis
const client = createClient();

client.on("error", (err) => console.error("Redis Client Error", err));

async function run() {
  await client.connect();

  // set key
  await client.set("username", "Tanushree");

  // get key
  const value = await client.get("username");
  console.log(value); // "Tanushree"
}

run();
