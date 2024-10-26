// import axios from 'axios';
// import { useEffect, useRef, useState } from 'react';

// const App = () => {
//   const [score,setScore] =useState(0)
//   const [storData, setstorData] = useState(null);
//     const [currentIndex, setCurrentindex] = useState(0);
// const input = useRef([])
//   useEffect(() => {
//     axios("https://the-trivia-api.com/v2/questions")
//       .then((res) => {
//         setstorData(res.data);
//         console.log(res.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);

//   const nextQuestion = () => {
//     const selectedOption = input.current.find(item => item && item.checked);
//     console.log(selectedOption.value) 
//     if (storData && currentIndex < storData.length - 1) {
//       setCurrentindex(currentIndex + 1);
//     // }
//     // if (selectedOption) {
//     //   // Check if the selected answer is correct
//     //   if (selectedOption.value === storData[currentIndex].correctAnswer) {
//     //     setScore(prevScore => prevScore + 1); // Increment score if correct
//     //     console.log("Correct answer!");
//     //   } else {
//     //     console.log("Wrong answer!");
//     //   }


//   };

//   const shuffleArray = (array) => {
//     for (let i = array.length - 1; i > 0; i--) {
//       const randomIndex = Math.floor(Math.random() * (i + 1));
//       // Swap elements
//       [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
//     }
//     return array;
//   };
//   // const number = ()=>{
//   //   if(seletedOption.value === correctAnswer){
//   //     console.log("chal gya ha")
//   //   }else{
//   //     console.log("nhyn cla")
//   //   }
//   // }

//   return (
//     <>
//     <div className='min_box'>
//       <h1 className='text' >Quiz App</h1>
//       {storData ? (
//         <>
//           <div>
//             <p className='text_2'>Q{currentIndex + 1}: {storData[currentIndex].question.text}</p>
//           </div>
//           <div className='box_2'>
//           {shuffleArray([...storData[currentIndex].incorrectAnswers, storData[currentIndex].correctAnswer])?.map((item, index) => (
//             <div className='text_3' key={index}>
//               <input type="radio" name="question" value={item} id={index} ref={el => input.current[index] =el} />
//               <label htmlFor={index}>{item}</label>
//             </div>
            
//           ))}
//           </div>
//           <button className='button' onClick={nextQuestion}>Next</button>
//         </>
//       ) : (
//         <h1>Loading...</h1>
//       )}
    
//       </div>
//     </>
//   );
// }

// export default App;




import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

const App = () => {
  const [score, setScore] = useState(0);
  const [storData, setStorData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const input = useRef([]);

  useEffect(() => {
    axios("https://the-trivia-api.com/v2/questions")
      .then((res) => {
        setStorData(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const nextQuestion = () => {
    const selectedOption = input.current.find(item => item && item.checked);
    
    if (selectedOption) {
      if (selectedOption.value === storData[currentIndex].correctAnswer) {
        setScore(score + 10); 
        console.log("Correct answer!");
      } else {
        console.log("Wrong answer!");
      }
    }

    if (storData && currentIndex < storData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      console.log("Quiz finished! Your score is:", score);
      
    }

   
    input.current.forEach(item => {
      if (item) item.checked = false;
    });
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
    }
    return array;
  };

  return (
    <>
      <div className='min_box'>
        <h1 className='text'>Quiz App</h1>
        {storData ? (
          <>
            <div>
              <p className='text_2'>Q{currentIndex + 1}: {storData[currentIndex].question.text}</p>
            </div>
            <div className='box_2'>
              {shuffleArray([...storData[currentIndex].incorrectAnswers, storData[currentIndex].correctAnswer]).map((item, index) => (
                <div className='text_3' key={index}>
                  <input   type="radio"  name="question"  value={item} id={index} ref={el => input.current[index] = el}/>
                  <label htmlFor={index}>{item}</label>
                </div>
              ))}
            </div>
            <button className='button' onClick={nextQuestion}>Next</button>
          </>
        ) : (
          <h1>Loading...</h1>
        )}
      
        
        <p className='score'>
        Scoer:  {score}
        </p>
      </div>

    </>
  );
}

export default App;
