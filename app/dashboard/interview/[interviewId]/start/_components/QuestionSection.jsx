import { Lightbulb, Volume2 } from 'lucide-react';
import React from 'react';

function QuestionSection({ mockInterviewQuestion, activeQuestionIndex }) {
  const textToSpeech = (text) => {
    if ('speechSynthesis' in window) {
      if (text) {
        window.speechSynthesis.cancel();

        const speech = new SpeechSynthesisUtterance(text);
        speech.volume = 1;
        speech.rate = 1;   
        speech.pitch = 1;

        speech.onend = () => {
          console.log("Speech has finished.");
        };

        window.speechSynthesis.speak(speech);
      } else {
        alert('The text is empty or undefined.');
      }
    } else {
      alert('Sorry, your browser does not support text-to-speech.');
    }
  };

  return (
    mockInterviewQuestion && (
      <div className='p-5 border rounded-lg my-5'>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
          {Array.isArray(mockInterviewQuestion) &&
            mockInterviewQuestion.map((item, index) => (
              <div key={index} className='my-4'>
                <h2
                  className={`p-3 rounded-full text-xs md:text-sm text-center cursor-pointer ${
                    activeQuestionIndex === index ? 'bg-blue-800 text-white' : 'bg-slate-200'
                  }`}
                >
                  Question #{index + 1}
                </h2>
              </div>
            ))}
        </div>

        <div className="my-5 text-md md:text-lg text-justify h-32 overflow-y-auto border p-4 rounded-lg bg-slate-100">
          {mockInterviewQuestion[activeQuestionIndex]?.question}
        </div>

        <Volume2
          className='cursor-pointer'
          onClick={() => textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question)}
        />

        <div className='border rounded-lg p-5 bg-blue-100 mt-20'>
          <h2 className='flex gap-2 items-center text-blue-800'>
            <Lightbulb />
            <strong>Note:</strong>
          </h2>
          <h2 className='text-sm text-blue-800 my-2 text-justify'>
            {process.env.NEXT_PUBLIC_QUESTION_NOTE}
          </h2>
        </div>
      </div>
    )
  );
}

export default QuestionSection;
