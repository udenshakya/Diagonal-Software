import React, { useState, useEffect } from "react";

function AgeCalculator() {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [age, setAge] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValidDate = validateDate(year, month, day);

    if (!isValidDate) {
      setError("Please enter a valid date.");
      return;
    }

    setError("");
  };

  //   Updating date in every second
  useEffect(() => {
    const interval = setInterval(() => {
      if (year && month && day) {
        calculateAge();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [year, month, day]);

  const calculateAge = () => {
    const dob = new Date(year, month - 1, day);
    const now = new Date();

    const diff = now - dob;
    const ageDate = new Date(diff);

    const years = ageDate.getUTCFullYear() - 1970;
    const months = ageDate.getUTCMonth();
    const days = ageDate.getUTCDate() - 1;
    const hours = ageDate.getUTCHours();
    const minutes = ageDate.getUTCMinutes();
    const seconds = ageDate.getUTCSeconds();

    setAge({ years, months, days, hours, minutes, seconds });
  };

  const validateDate = (year, month, day) => {
    const date = new Date(year, month - 1, day);
    return (
      date.getFullYear() === parseInt(year, 10) &&
      date.getMonth() === parseInt(month, 10) - 1 &&
      date.getDate() === parseInt(day, 10)
    );
  };

  return (
    <section className="container mx-auto h-[80vh] flex flex-col justify-center items-center bg-gray-200 p-2 rounded-lg md:w-1/2 w-[70%]  gap-10 px-3">
      <h1 className="text-center text-3xl font-bold mb-10">Age Calculator</h1>
      <form onSubmit={handleSubmit} className="md:flex md:flex-row text-center flex flex-col gap-2">
        <input
          type="number"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="px-2 py-1 rounded-md"
        />
        <input
          type="number"
          placeholder="Month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="px-2 py-1 rounded-md"
          required min="1" max="12"
        />
        <input
          type="number"
          placeholder="Day"
          value={day}
          onChange={(e) => setDay(e.target.value)}
          className="px-2 py-1 rounded-md"
          required min="1" max="31"
        />
        <button
          type="submit"
          className="bg-gray-800 rounded-xl p-2 text-white mt-4 md:mt-0"
        >
          Calculate Age
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p className="text-md px-4 md:px-0 text-center">
        <span className="font-bold"> {age.years} </span>
        years,<span className="font-bold"> {age.months} </span> months,
        <span className="font-bold"> {age.days} </span> days,
        <span className="font-bold"> {age.hours} </span>
        hours,<span className="font-bold"> {age.minutes} </span> minutes,
        <span className="font-bold"> {age.seconds} </span> seconds
      </p>
    </section>
  );
}

export default AgeCalculator;
