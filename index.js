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
    let message = "hiii this my rabbitmq program";
    channel.assertQueue(queueName, {
      durable: false,
    });
    channel.sendToQueue(queueName, Buffer.from(message));
    console.log(`message:${message}`);
    setTimeout(function () {
      connection.close();
      process.exit(0);
    }, 500);
  });
});
