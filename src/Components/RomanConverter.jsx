import React, { useState } from "react";

const RomanConverter = ({ onSubmit }) => {
  const [romanNumeral, setRomanNumeral] = useState("");
  const [numbers, setNumbers] = useState(0);

  const romanToNumber = (roman) => {
    const romanNumerals = {
      I: 1,
      V: 5,
      X: 10,
      L: 50,
      C: 100,
      D: 500,
      M: 1000,
    };

    let result = 0;

    for (let i = 0; i < roman.length; i++) {
      const current = romanNumerals[roman[i]];
      const next = romanNumerals[roman[i + 1]];

      if (next && current < next) {
        result -= current;
      } else {
        result += current;
      }
    }

    return result;
  };

  const handleChange = (e) => {
    setRomanNumeral(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const number = romanToNumber(romanNumeral.toUpperCase());
    setNumbers(number);
  };

  return (
    <section className="container mx-auto p-2 h-[90vh] flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-200 flex flex-col gap-10 md:w-1/2 w-[60%]  mx-auto justify-center items-center h-[70%] rounded-lg"
      >
        <h1 className="text-center sm:text-3xl text-lg font-bold">
          Roman Numeral Converter
        </h1>
        <div className="xl:flex text-center gap-2">
          <input
            type="text"
            placeholder="Enter Roman Numeral"
            value={romanNumeral}
            required
            onChange={handleChange}
            className="md:px-4 md:py-2 rounded-md"
          />
          <button
            type="submit"
            className="bg-gray-800 rounded-xl p-2 text-white mt-4 md:mt-0"
          >
            Convert
          </button>
        </div>
        <h1 className="md:text-2xl">
          Converted number is: <span className="font-bold"> {numbers}</span>{" "}
        </h1>
      </form>
      <div></div>
    </section>
  );
};

export default RomanConverter;
