import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import ReactDatePicker from "react-datepicker";
import { fi } from "date-fns/locale";

const locales = {
  fi,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CalendarPage = () => {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://traineeapp.azurewebsites.net/gettrainings");
        const data = await response.json();
        console.log("Data from API:", data);
        setTrainings(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const events = trainings.map((training) => ({
    title: `${training.activity} \n ${training.customer ? training.customer.firstname + ' ' + training.customer.lastname : 'Unknown Customer'}`,
    start: new Date(training.date),
    end: new Date(training.date), // You can adjust the end date if needed
  }));

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
};

export default CalendarPage;