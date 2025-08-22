const { createClient } = require("redis");

async function subscribe() {
  const client = createClient();
  await client.connect();

  console.log("Subscribed to channel: news");

  await client.subscribe("news", (message) => {
    console.log("📩 Received:", message);
  });
}

subscribe();
