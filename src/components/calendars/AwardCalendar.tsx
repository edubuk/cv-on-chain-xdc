import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

interface Props {
  value: any;
  setValue: React.Dispatch<React.SetStateAction<any>>;
  // defaultDate: any;
  index: number;
}

export default function AwardCalendar({
  value,
  setValue,
  // defaultDate,
  index,
}: Props) {
  const storedFormData = localStorage.getItem("step5CvData");
  let Awards;
  if (storedFormData) {
    const parsedData = JSON.parse(storedFormData);
    const { Awards: aw } = parsedData;
    Awards = aw;
  }

  // Determine the initial default date as a dayjs object
  const initialDefaultDate =
    dayjs(Awards?.[index]?.date_of_achievement) || dayjs("2022-04-17"); // Fallback to a specific date if undefined

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          value={value}
          onChange={setValue}
          defaultValue={initialDefaultDate}
          views={["year", "month", "day"]}
          className="w-full"
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
