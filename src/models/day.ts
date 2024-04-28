import { Schema, model, models } from "mongoose";

const DaySchema = new Schema({
  dayOfWeek: {
    type: String,
  },
  monthYear: {
    type: String,
  },
  dayName: {
    type: String,
  },
  events: {
    type: Array,
    default: [
      {
        title: String,
        description: String,
        time: String,
        location: String,
      },
    ],
  },
});

const TyeeCalendarDay = models.Day || model("Day", DaySchema);

export default TyeeCalendarDay;
