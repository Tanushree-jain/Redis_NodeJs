async function safeDecrement() {
  const client = createClient();
  await client.connect();

  let success = false;
  while (!success) {
    await client.watch("balance");
    const balance = parseInt(await client.get("balance"));

    if (balance < 10) {
      console.log("Not enough balance");
      await client.unwatch();
      break;
    }

    const tx = client.multi();
    tx.decrBy("balance", 10);

    const result = await tx.exec();

    if (result) {
      console.log("Transaction success:", result);
      success = true;
    } else {
      console.log("Retrying transaction...");
    }
  }

  await client.quit();
}
