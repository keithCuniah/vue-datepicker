<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <DatePicker value="2022-06-21" format="DD/MM/YY" name="start" />
    <DatePicker value="2030-01-25" format="DD/MM/YY" name="end" />
  </div>
</template>

<script>
import DatePicker from "./components/datepicker/Datepicker.vue";

export default {
  name: "App",
  components: { DatePicker },
};
</script>

<style module></style>
