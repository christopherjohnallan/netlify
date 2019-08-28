require("dotenv").config()

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Hi there Tacos",
      event
    })
  }
}