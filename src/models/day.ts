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
});

const TyeeCalendarDay = models.Day || model("Day", DaySchema);

export default TyeeCalendarDay;
