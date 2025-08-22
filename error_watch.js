const { createClient } = require("redis");

async function run() {
  const client1 = createClient();
  const client2 = createClient();

  await client1.connect();
  await client2.connect();

  // Set initial balance
  await client1.set("balance", 100);

  // Client 1 watches the balance
  await client1.watch("balance");

  // Client 2 updates the balance at the same time
  await client2.set("balance", 50);

  // Client 1 tries to update the balance using a transaction
  const tx = client1.multi();
  tx.decrBy("balance", 10); // deduct 10

  const result = await tx.exec(); // EXEC

  if (result === null) {
    console.log("Transaction failed: balance was modified by another client!");
  } else {
    console.log("Transaction succeeded:", result);
  }

  await client1.quit();
  await client2.quit();
}

run();
