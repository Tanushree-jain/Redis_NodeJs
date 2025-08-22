const { createClient } = require("redis");

async function publish() {
  const client = createClient();
  await client.connect();

  await client.publish("news", "Breaking news: Redis Pub/Sub working!");
  console.log("✅ Message published");

  await client.quit();
}

publish();
