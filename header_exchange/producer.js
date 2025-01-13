const amqp = require('amqplib');

// Connection URL for RabbitMQ server
const rabbitMQUrl = 'amqp://18.206.126.118:5672';
async function publishToHeaderExchange(message, headers) {
  // Create a connection to the RabbitMQ server
  const connection = await amqp.connect(rabbitMQUrl);

  // Create a channel
  const channel = await connection.createChannel();

  // Declare a header exchange named 'headers_exchange'
  const exchangeName = 'headers_exchange';
  await channel.assertExchange(exchangeName, 'headers', { durable: false });

  // Publish a message with headers
  channel.publish(exchangeName, '', Buffer.from(message), { headers });

  console.log(`Sent message: ${message} with headers:`, headers);

  // Close the connection
  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 500);
}

// Example: Publish a message to the header exchange with specific headers
const messageToPublish = 'Hello Header Exchange!';
const headersToPublish = { 'header1': 'value1', 'header2': 'value2' };
publishToHeaderExchange(messageToPublish, headersToPublish);
