const amqp = require('amqplib');

async function receiveMessage() {
  try {
    const connection = await amqp.connect('amqp://18.206.126.118:5672/#/queues');
    const channel = await connection.createChannel();
    const queue = 'payment';

    // Declare a queue
    await channel.assertQueue(queue, { durable: true });

    console.log(` [*] Waiting for messages in ${queue}. To exit press CTRL+C`);

    // Consume messages from the queue
    channel.consume(queue, (msg) => {
      if (msg !== null) {
        console.log(` [x] Received ${msg.content.toString()}`);
        channel.ack(msg); // Acknowledge the message
      }
    });
  } catch (error) {
    console.error(error);
  }
}

receiveMessage();
