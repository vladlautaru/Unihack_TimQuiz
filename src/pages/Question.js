import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import '../css/Question.css'
import ChatBox from './ChatBox'

const questions=[
    {
        question: "What river flows trough Timișoara?",
        answers:[
            {text:"Timiș", correct:false},
            {text:"Bega", correct:true},
            {text:"Criș", correct:false},
            {text:"Mureș", correct:false},
        ]
    },
    {
        question: "What place is shown in the image?",
        answers:[
            {text:"Piața Libertății", correct:false},
            {text:"Piața Victoriei", correct:false},
            {text:"Bastionul Maria Theresia", correct:false},
            {text:"Piața Unirii", correct:true},
        ],
        image: require('../images/piata_unirii_intrebare.jpg')
    },

    {
        question: "Timișoara, as the European Capital of Culture, had the slogan:",
        answers:[
            {text:"Light up the city through you", correct:true},
            {text:"Light up and shine alongside others", correct:false},
            {text:"Make light around you", correct:false},
            {text:"You are the light of the city", correct:false},
        ]
    },
    {
        question: "What does December 16th signify for Timișoara?",
        answers:[
            {text:"The Colectiv disaster", correct:false},
            {text:"The 1989 Revolution", correct:true},
            {text:"The 1907 Rebellion", correct:false},
            {text:"The end of World War I", correct:false}
        ]
    },
    {
        question: "Which of the following inventors was born in Timișoara?",
        answers:[
            {text:"Aurel Vlaicu", correct:false},
            {text:"Henri Coandă", correct:false},
            {text:"Victor Babeș", correct:false},
            {text:"Francesco Illy", correct: true}
        ]
    },
    {
        question: "What is the name of the building shown in the image?",
        answers:[
            {text:"Palatul Culturii", correct:false},
            {text:"Catedrala Mitropolitana Ortodoxa Romana", correct:false},
            {text:"Sinagoga din Fabric", correct:true},
            {text:"Palatul Apelor", correct:false}
        ],
        image: require('../images/sinagoga_fabric.jpg')
    }
];

function Questions() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [answers, setAnswers] = useState(Array(questions.length).fill(false));
    const navigate = useNavigate();

    const handleAnswer = (isCorrect) => {
        const nextQuestionIndex = currentQuestionIndex + 1;
        const currentScore = score + ((isCorrect) ? 10 : 0);

        setAnswers(prevAnswers => {
            const updatedAnswers = [...prevAnswers];
            updatedAnswers[currentQuestionIndex] = isCorrect;
            return updatedAnswers;
        });

        setScore(currentScore);

        if (nextQuestionIndex < questions.length) {
            setCurrentQuestionIndex(nextQuestionIndex);
        } else {
            navigate('/score', { state: {score: currentScore}});
        }
    }

    const goToNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            navigate('/score', { state: { score } });
        }
    }

    const goToPrevious = () => {
        if (currentQuestionIndex > 0) {
            const prevIndex = currentQuestionIndex - 1;
            const wasCorrect = answers[prevIndex];

            if (wasCorrect) {
                setScore(score - 10);
            }

            setAnswers(prevAnswers => {
                const updatedAnswers = [...prevAnswers];
                updatedAnswers[prevIndex] = false;
                return updatedAnswers;
            });

            setCurrentQuestionIndex(currentQuestionIndex - 1);
        } else {
            navigate('/');
        }
    }

    const hasImage = questions[currentQuestionIndex].image;
    return (
        <div className="app">
            <div className="title">
                <h1>TimQuiz</h1>
            </div>
            <div className={`quiz ${hasImage ? "question-with-image" : "question-no-image"}`}>
                <h2 id="question">{questions[currentQuestionIndex].question}</h2>
                {hasImage && (
                    <img src={questions[currentQuestionIndex].image} className="imagines"/>
                )}
                <div id="answer" className={questions[currentQuestionIndex].image ? "answer-with-image" : "answer-no-image"}>
                    {questions[currentQuestionIndex].answers.map((answer, index) => (
                        <button key={index} className="btn" onClick={() => handleAnswer(answer.correct)}>
                            {answer.text}
                        </button>
                    ))}
                </div>
                <div className="button-container">
                    <button id="previous-btn" onClick={goToPrevious}>Previous</button>
                    <button id="next-btn" onClick={goToNext}>Next</button>
                </div>
            </div>
            <ChatBox />
        </div>
    );
}

export default Questions;