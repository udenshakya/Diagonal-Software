import React, { useState } from "react";

function NextBirthdayCountdown() {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [countdown, setCountdown] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the input
    if (!isValidDate(year, month, day)) {
      setErrorMessage("Please enter a valid date.");
      return;
    }

    // Calculate countdown
    const birthday = new Date(year, month - 1, day);
    const currentTime = new Date();
    const nextBirthday = getNextBirthday(birthday, currentTime);

    // Start countdown
    startCountdown(nextBirthday);
  };

  const isValidDate = (year, month, day) => {
    const date = new Date(year, month - 1, day);
    return (
      !isNaN(date.getTime()) &&
      date.getFullYear() == year &&
      date.getMonth() + 1 == month &&
      date.getDate() == day
    );
  };

  const getNextBirthday = (birthday, currentTime) => {
    const currentYear = currentTime.getFullYear();
    const nextBirthday = new Date(
      currentYear,
      birthday.getMonth(),
      birthday.getDate()
    );

    if (nextBirthday < currentTime) {
      nextBirthday.setFullYear(currentYear + 1);
    }

    return nextBirthday;
  };

  const startCountdown = (nextBirthday) => {
    const intervalId = setInterval(() => {
      const currentTime = new Date();
      const difference = nextBirthday.getTime() - currentTime.getTime();

      if (difference <= 0) {
        clearInterval(intervalId);
        setCountdown("");
      } else {
        const months = Math.floor(difference / (1000 * 60 * 60 * 24 * 30));
        const days = Math.floor(
          (difference % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24)
        );
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setCountdown(
          `${months} months, ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`
        );
      }
    }, 1000);
  };

  return (
    <section className="container mx-auto h-[80vh] flex flex-col mt-20 justify-center items-center bg-gray-200 p-2 rounded-lg md:w-1/2 w-[70%]  gap-10 px-3">
      <h1 className="text-3xl font-bold mb-4 text-center">Next Birthday Countdown</h1>
      <form
        onSubmit={handleSubmit}
        className="md:flex md:flex-row text-center flex flex-col gap-2"
      >
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="Year"
          className="px-2 py-1 rounded-md"
        />
        <input
          type="number"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          placeholder="Month"
          className="px-2 py-1 rounded-md"
          required
          min="1"
          max="12"
        />
        <input
          type="number"
          value={day}
          onChange={(e) => setDay(e.target.value)}
          placeholder="Day"
          className="px-2 py-1 rounded-md"
          required
          min="1"
          max="31"
        />
        <button
          type="submit"
          className="bg-gray-800 rounded-xl p-2 text-white mt-4 md:mt-0"
        >
          Submit
        </button>
      </form>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {countdown ? <div className="text-md">Countdown: {countdown}</div> : <div>Enter date.</div>}
    </section>
  );
}

export default NextBirthdayCountdown;
