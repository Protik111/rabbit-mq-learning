const amqp = require('amqplib');

async function sendMessage() {
  try {
    const connection = await amqp.connect('amqp://18.206.126.118:5672');
    const channel = await connection.createChannel();
    const exchange = 'order_finish_notification'; // Set the exchange name
    //const routingKey = 'hira'; // Set the routing key
    const payment = 'payment'; // Set the desired queue name
    const invoice = 'invoice'; // Set the desired queue name
    const shipping = 'shipping'; // Set the desired queue name
    const warehouse = 'warehouse'; // Set the desired queue name
    const message = 'Payload message';

    // Declare a direct exchange
    await channel.assertExchange(exchange, 'fanout', { durable: false });

    // Declare a named, permanent queue
    await channel.assertQueue("invoice", { durable: true });
    await channel.assertQueue("payment", { durable: true });
    await channel.assertQueue("shipping", { durable: true });
    await channel.assertQueue("warehouse", { durable: true });

    // Bind the queue to the exchange with the routing key
    await channel.bindQueue(invoice, exchange, "");
    await channel.bindQueue(shipping, exchange, "");
    await channel.bindQueue(warehouse, exchange, "");
    await channel.bindQueue(payment, exchange, "");

    // Send a message to the exchange with a routing key
    channel.publish(exchange, "", Buffer.from(message));

    console.log(` [x] Sent '${message}'`);

    // Close the connection after sending the message
    setTimeout(() => {
      connection.close();
      process.exit(0);
    }, 500);
  } catch (error) {
    console.error(error);
  }
}

sendMessage();
