const amqplib = require("amqplib/callback_api");
amqplib.connect(`amqp://localhost`, (err, connection) => {
  if (err) {
    throw err;
  }
  connection.createChannel((err, channel) => {
    if (err) {
      throw err;
    }
    let queueName = "hello";
    channel.assertQueue(queueName, {
      durable: false,
    });
    channel.consume(queueName, function (msg) {
      console.log(`Recieved: ${msg.content.toString()}`);
      channel.ack(msg);
    });
  });
});
