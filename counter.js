const { createClient } = require("redis");

// connect to redis
const client = createClient();

client.on("error", (err) => console.error("Redis Client Error", err));

async function run() {
  await client.connect();

// set initial value
await client.set("pageViews", 0);

// increment
await client.incr("pageViews");  
await client.incr("pageViews");  
await client.incr("pageViews");  

console.log(await client.get("pageViews")); // "3"

// decrement
await client.decr("pageViews");

console.log(await client.get("pageViews")); // "2"

}

run();
