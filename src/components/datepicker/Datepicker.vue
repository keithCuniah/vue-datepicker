<template>
  <div class="datepicker__container">
    <input type="text" :value="dateFormatted" @click="showDatepicker" />
    <input type="hidden" :value="dateRaw" :name="name" />
    <DatepickerAgenda
      :date="date"
      :visible="isVisible"
      @change="selectDate"
      @cancel="hideDatepicker"
    >
    </DatepickerAgenda>
  </div>
</template>

<script>
import DatepickerAgenda from "./DatepickerAgenda.vue";
import moment from "moment";
moment.locale("fr");

export default {
  name: "DatePicker",
  props: {
    value: {
      type: String,
      required: true,
    },
    format: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
  },
  components: {
    DatepickerAgenda,
  },
  data() {
    return {
      defaultFormat: "YYYY-MM-DD",
      isVisible: false,
      date: moment(this.value, "YYYY-MM-DD"),
    };
  },
  computed: {
    dateFormatted() {
      return this.date.format(this.format);
    },
    dateRaw() {
      return this.date.format(this.defaultFormat);
    },
  },
  methods: {
    selectDate(date) {
      this.date = date;
      this.hideDatepicker();
    },
    showDatepicker() {
      this.isVisible = true;
      setTimeout(
        () => document.addEventListener("click", this.hideDatepicker),
        0,
      );
    },
    hideDatepicker() {
      this.isVisible = false;
      document.removeEventListener("click", this.hideDatepicker);
    },
  },
};
</script>

<style lang="scss" scoped>
.datepicker__container {
  position: relative;
}
</style>
