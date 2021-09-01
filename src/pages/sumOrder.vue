<template>
  <div>
    <sum-order></sum-order>
  </div>
</template>

<script>
import PaySummary from "components/payment/pay-summary";
import PayCard from "components/payment/payment-inputs";
import SumOrder from "components/payment/sumOrder-inputs";

export default {
  name: "paymentPage",
  components: {SumOrder, PayCard, PaySummary},
  data() {
    return {

    }
  },
  methods:{

  }
}
</script>

<style scoped>
*{
  display: flex;
  justify-content: center;
}
</style>
