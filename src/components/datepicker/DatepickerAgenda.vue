<template>
  <transition name="datepicker_slide">
    <div class="datepicker" v-if="visible" @click.stop>
      <div class="datepicker__header">
        <div class="datepicker__year">{{ year }}</div>
        <div class="datepicker__date">{{ dateFormatted }}</div>
      </div>
      <div class="datepicker__controls">
        <div class="datepicker__month">
          <transition-group name="slideh">
            <span v-for="month in [month]" :key="month.month">{{
              month.getFormatted()
            }}</span>
          </transition-group>
        </div>
        <button class="datepicker__next" @click="nextMonth()">
          <svg viewBox="0 0 24 24">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
          </svg>
        </button>
        <button class="datepicker__prev" @click="prevMonth()">
          <svg viewBox="0 0 24 24">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>
          </svg>
        </button>
      </div>
      <div class="datepicker__week">
        <div
          v-for="(day, index) in days"
          :key="index"
          class="datepicker__weekday"
        >
          {{ day }}
        </div>
      </div>
      <div class="datepicker__days" :class="classWeeks">
        <div
          class="datepicker__day"
          :style="{ width: `${month.getWeekStart() * 41}px` }"
          :key="month.month + 'offset'"
        ></div>
        <div
          :class="{
            datepicker__day: true,
            selected: isSelected(day),
          }"
          @click="selectDate(day)"
          v-for="(day, index) in month.getDays()"
          :key="index"
        >
          <span class="datepicker__day__effect"></span>
          <span class="datepicker__day__text">{{ day.format("D") }}</span>
        </div>
      </div>
      <div class="datepicker__actions">
        <button @click="cancel">Annuler</button>
        <button @click="submit">Ok</button>
      </div>
    </div>
  </transition>
</template>

<script>
import Month from "../../modules/month";

export default {
  name: "DatepickerAgenda",
  props: {
    date: {
      type: Object,
      required: true,
    },
    visible: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      cloneDate: this.date.clone(),
      days: ["L", "M", "M", "J", "V", "S", "D"],
      month: new Month(this.date.month(), this.date.year()),
    };
  },
  computed: {
    year() {
      return this.cloneDate.format("YYYY");
    },
    dateFormatted() {
      return this.cloneDate.format("dddd DD MMM");
    },
    classWeeks() {
      return `has-${this.month.getWeeks()}-weeks`;
    },
  },
  methods: {
    isSelected(day) {
      return this.cloneDate.unix() === day.unix();
    },
    selectDate(day) {
      this.cloneDate = day;
    },
    nextMonth() {
      let month = this.month.month + 1;
      let year = this.month.year;
      if (month > 11) {
        year += 1;
        month = 0;
      }
      this.month = new Month(month, year);
    },
    prevMonth() {
      let month = this.month.month - 1;
      let year = this.month.year;
      if (month < 0) {
        year -= 1;
        month = 11;
      }
      this.month = new Month(month, year);
    },
    submit() {
      this.$emit("change", this.cloneDate);
    },
    cancel() {
      this.$emit("cancel");
    },
  },
};
</script>

<style scoped lang="scss">
@import "animation.scss";

$header-height: 100px;
$day-size: 41px;

.datepicker {
  position: absolute;
  width: 315px;
  z-index: 5;
  top: 100%;
  background: #fff;
  box-shadow: 0 14px 45px rgba(0, 0, 0, 0.25), 0 10px 18px rgba(0, 0, 0, 0.22);
}

.datepicker__header {
  background-color: #0097a7;
  color: #fff;
  padding: 20px;
  height: $header-height;
}

.datepicker__year {
  opacity: 0.7;
  margin-bottom: 10px;
  line-height: 16px;
}

.datepicker__date {
  font-size: 32px;
  line-height: 32px;
}

.datepicker__week {
  font-size: 12px;
  line-height: 12px;
  color: rgba(0, 0, 0, 0.8);
  padding: 0 14px;
}

.datepicker__weekday {
  float: left;
  width: $day-size;
  text-align: center;
}

.datepicker__days {
  position: relative;
  margin: 14px 14px 0 14px;
  height: $day-size * 5;
  transition: height 0.3s;
  &.has-6-weeks {
    height: $day-size * 6;
  }
}

.datepicker__day {
  position: relative;
  width: $day-size;
  height: $day-size;
  float: left;
  text-align: center;
  line-height: $day-size;
  cursor: pointer;
  transition: color 450ms cubic-bezier(0.23, 1, 0.32, 1);
}

.datepicker__day__effect {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: rgba(0, 151, 167);
  transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1);
  transform: scale(0);
  opacity: 0;
}

.datepicker__day:hover {
  color: #fff;
  .datepicker__day__effect {
    transform: scale(1);
    opacity: 0.6;
  }
}

.datepicker__day__text {
  position: relative;
}

.datepicker__day.selected {
  color: #fff;
  .datepicker__day__effect {
    transform: scale(1);
    opacity: 1;
  }
}

.datepicker__controls {
  position: relative;
  height: 56px;
  line-height: 56px;
  text-align: center;
  button {
    position: relative;
    width: 56px;
    height: 56px;
    cursor: pointer;
    border: none;
    background-color: transparent;
    user-select: none;
    outline: none;
  }

  svg {
    width: 24px;
    height: 24px;
    fill: rgba(0, 0, 0, 0.87);
    vertical-align: middle;
  }
}

.datepicker__month {
  position: absolute;
  overflow: hidden;
  height: 16px;
  line-height: 16px;
  top: 20px;
  right: 0;
  bottom: 0;
  left: 0;
}

.datepicker__next {
  float: right;
}

.datepicker__prev {
  float: left;
}

.datepicker__actions {
  text-align: right;
  padding: 8px;
}

.datepicker__actions button {
  border: none;
  background-color: transparent;
  display: inline-block;
  outline: none;
  color: #00bcd4;
  cursor: pointer;
  font-size: 14px;
  text-transform: uppercase;
  font-weight: 500;
  min-width: 88px;
  text-align: center;
  -webkit-appearance: none;
  line-height: 36px;
  transition: all 0.3s;
  &:hover {
    background-color: rgba(153, 153, 153, 0.2);
  }
}

.datepicker_slide-enter-active {
  animation: translate-horizontal 0.3s;
}
.datepicker_slide-leave-active {
  animation: translate-horizontal 0.3s reverse;
}
@keyframes translate-horizontal {
  from {
    transform: translateY(-50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
/* // FIXME transition seems to not work well with css module
  .datepicker_slide {
    opacity: 1;
    transition: all 0.3;
    transform: translateY(0);
    &:global(-enter-active) {
      opacity: 0;
      transform: translateY(-50px);
    }
    &:global(-leave-active) {
      opacity: 0;
      transform: translateY(-50px);
    }
    &:global(-enter) {
      opacity: 0;
      transform: translateY(-50px);
    }
    &:global(-leave-to) {
      opacity: 0;
      transform: translateY(-50px);
    }
  } */
</style>
