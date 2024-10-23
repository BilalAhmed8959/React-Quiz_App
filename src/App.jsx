import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

const App = () => {
  const [storData, setstorData] = useState(null);
  const [totalScore,setTotalScore] = useState(0)
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
    if (selectedOption) {
      const selectedValue = selectedOption.value;
      if (selectedValue === questions[currentIndex].correctAnswer) {
        setTotalScore(totalScore + 10);
      }
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
    <div className='min_box'>
      <h1 className='text' >Quiz App</h1>
      {storData ? (
        <>
          <div>
            <p className='text_2'>Q{currentIndex + 1}: {storData[currentIndex].question.text}</p>
          </div>
          <div className='box_2'>
          {shuffleArray([...storData[currentIndex].incorrectAnswers, storData[currentIndex].correctAnswer])?.map((item, index) => (
            <div className='text_3' key={index}>
              <input type="radio" name="question" value={item} id={index} ref={el => input.current[index] =el} />
              <label htmlFor={index}>{item}</label>
            </div>
            
          ))}
          </div>
          <button className='button' onClick={nextQuestion}>Next</button>
        </>
      ) : (
        <h1>Loading...</h1>
      )}
      {/* <p>{totalScore}</p> */}
      </div>
    </>
  );
}

export default App;
