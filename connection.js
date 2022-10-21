require('dotenv').config()
const amqplib = require('amqplib')

const amqpUrl = process.env.RABBITMQ_URL

const rabbitmq = async () => {
  try {
    const connection = await amqplib.connect(amqpUrl, 'heartbeat=60')
    const channel = await connection.createChannel()
    return {
      status: 'connected',
      connection,
      channel,
      exception: null
    }
  } catch (error) {
    console.info('error in connection rabbitmq', error)
    return {
      status: 'disconected',
      exception: error
    }
  }
}

rabbitmq().then((r) => {
  console.log(r?.status)
})