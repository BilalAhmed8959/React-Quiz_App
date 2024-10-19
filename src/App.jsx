import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

const App = () => {
  const [storData, setstorData] = useState(null);
  const [currentIndex, setCurrentindex] = useState(0);
const input = useRef([])
  useEffect(() => {
    axios("https://the-trivia-api.com/v2/questions")
      .then((res) => {
        setstorData(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const nextQuestion = () => {
    const seletedOption = input.current.find(item => item && item.checked);
    console.log(seletedOption.value) 
    if (storData && currentIndex < storData.length - 1) {
      setCurrentindex(currentIndex + 1);
    }
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      // Swap elements
      [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
    }
    return array;
  };

  return (
    <>
      <h1>Quiz App</h1>
      {storData ? (
        <>
          <div>
            <h1>Q{currentIndex + 1}: {storData[currentIndex].question.text}</h1>
          </div>
          {shuffleArray([...storData[currentIndex].incorrectAnswers, storData[currentIndex].correctAnswer])?.map((item, index) => (
            <div key={index}>
              <input type="radio" name="question" value={item} id={index} ref={el => input.current[index] =el} />
              <label htmlFor={index}>{item}</label>
            </div>
          ))}
          <button onClick={nextQuestion}>Next</button>
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
}

export default App;
