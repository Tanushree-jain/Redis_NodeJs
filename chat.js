const { createClient } = require("redis");

// connect to redis
const client = createClient();

client.on("error", (err) => console.error("Redis Client Error", err));

async function run() {
  await client.connect();
// add messages (like chat history)
await client.rPush("chatroom", "Hello!");
await client.rPush("chatroom", "How are you?");
await client.rPush("chatroom", "I am fine.");

// get all messages
const messages = await client.lRange("chatroom", 0, -1);
console.log(messages);  
// ["Hello!", "How are you?", "I am fine."]

// get latest message
const latest = await client.rPop("chatroom");
console.log("Latest:", latest);
// "I am fine."

}

run();
