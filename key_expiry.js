const { createClient } = require("redis");

// connect to redis
const client = createClient();

client.on("error", (err) => console.error("Redis Client Error", err));

async function run() {
  await client.connect();

  await client.set("session", "active", { EX: 5 }); 
  console.log(await client.get("session")); // "active"
setTimeout(async () => {
console.log(await client.get("session")); // null

}, 6000); // after 6 seconds
}

run();
