<template>
  <div id="app">
    <h1>Please give us your payment details:</h1>
    <card
      class="stripe-card"
      :class="{ complete }"
      stripe="pk_test_XXXXXXXXXXXXXXXXXXXXXXXX"
      :options="stripeOptions"
      @change="complete = $event.complete"
    />
    <button class="pay-with-stripe" @click="pay" :disabled="!complete">Pay with credit card</button>
    <section v-if="cartUIStatus === 'idle'">
      <app-cart-display />
    </section>

    <section v-else-if="cartUIStatus === 'loading'" class="loader">
      <app-loader />
    </section>

    <section v-else-if="cartUIStatus === 'success'" class="success">
      <h2>Success!</h2>
      <p>Thank you for your purchase. You'll be receiving your items in 4 business days.</p>
      <p>Forgot something?</p>

      <button class="pay-with-stripe">
        <nuxt-link exact to="/">Back to Home</nuxt-link>
      </button>
    </section>

    <section v-else-if="cartUIStatus === 'failure'">
      <p>Oops, something went wrong. Redirecting you to your cart to try again.</p>
    </section>
  </div>
</template>

<script>
import { stripeKey, stripeOptions } from './stripeConfig.json'
import { Card, createToken } from 'vue-stripe-elements-plus'

export default {
  data() {
    return {
      complete: false,
      stripeOptions: {
        // see https://stripe.com/docs/stripe.js#element-options for details
      },
      stripeEmail: ''
    }
  },

  components: { Card },

  methods: {
    pay() {
      // createToken returns a Promise which resolves in a result object with
      // either a token or an error key.
      // See https://stripe.com/docs/api#tokens for the token object.
      // See https://stripe.com/docs/api#errors for the error object.
      // More general https://stripe.com/docs/stripe.js#stripe-create-token.
      createToken().then((data) => {
        const stripeData = { data, stripeEmail: this.stripeEmail }
        this.$store.dispatch('postStripeFunction', stripeData)
      })
    }
  }
}
</script>