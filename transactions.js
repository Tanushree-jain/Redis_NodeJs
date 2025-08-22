const { createClient } = require("redis");
const client = createClient();

client.on("error", (err) => console.error("Redis Error:", err));

async function run() {
  await client.connect();

  // Start transaction
  const multi = client.multi();

  multi.set("balance", 100);
  multi.incrBy("balance", 50);
  multi.decrBy("balance", 20);

  // Execute transaction
  const results = await multi.exec();

  console.log("Transaction results:", results);
  console.log("Final balance:", await client.get("balance"));

  await client.quit();
}

run();
