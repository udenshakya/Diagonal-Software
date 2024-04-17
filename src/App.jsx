import React from 'react';
import RomanConverter from './Components/RomanConverter';
import AgeCalculator from './Components/AgeCalculator';
import NextBirthdayCountdown from './Components/NextBirthdayCountdown';


const App = () => {
  
  

  return (
    <div className="App">
      <RomanConverter  />
      <AgeCalculator />
      <NextBirthdayCountdown />
      
    </div>
  );
};

export default App;
