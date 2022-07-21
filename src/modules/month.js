import Moment from "moment";
import { extendMoment } from "moment-range";

const moment = extendMoment(Moment);

export default class Month {
  constructor(month, year) {
    this.start = moment([year, month]);
    this.end = this.start.clone().endOf("month");
    console.log(this.start.toString(), this.end.toString());
    this.month = month;
    this.year = year;
  }

  getWeekStart() {
    return this.start.weekday();
  }

  getDays() {
    return Array.from(moment.range(this.start, this.end).by("days"));
  }

  getFormatted() {
    return this.start.format("MMMM YYYY");
  }
}
