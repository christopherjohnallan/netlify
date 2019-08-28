export const actions = {
  async postStripeFunction({ getters, commit }, payload) {
    commit("updateCartUI", "loading")

    try {
      await axios
        .post(
          "https://sad-brown-86c280.netlify.com/.netlify/functions/index",
          {
            stripeEmail: payload.stripeEmail,
            stripeAmt: Math.floor(getters.cartTotal * 100), //it expects the price in cents                        
            stripeToken: "tok_visa", //testing token, later we would use payload.data.token
            stripeIdempotency: uuidv1() //we use this library to create a unique id
          },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(res => {
          if (res.status === 200) {
            commit("updateCartUI", "success")
            setTimeout(() => commit("clearCart"), 3000)
          }
        })
      } catch(err) {}
    }
  }