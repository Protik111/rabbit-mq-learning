const amqp = require('amqplib');

// Connection URL for RabbitMQ server
const rabbitMQUrl = 'amqp://localhost';

async function setupHeaderExchangeConsumer() {
  // Create a connection to the RabbitMQ server
  const connection = await amqp.connect(rabbitMQUrl);

  // Create a channel
  const channel = await connection.createChannel();

  // Declare a header exchange named 'headers_exchange'
  const exchangeName = 'headers_exchange';
  await channel.assertExchange(exchangeName, 'headers', { durable: false });

  // Declare a queue
  const { queue } = await channel.assertQueue('queue1');

  // Bind the queue to the header exchange with specific header criteria
  await channel.bindQueue(queue, exchangeName, '', { 'x-match': 'all', 'header1': 'value1', 'header2': 'value2' });

  // Consume messages from the queue
  channel.consume(queue, (msg) => {
    if (msg.content) {
      console.log(`Received message: ${msg.content.toString()}`);
    }
  }, { noAck: true });

  console.log('Waiting for messages. To exit, press CTRL+C');
}

// Run the consumer setup function
setupHeaderExchangeConsumer();
