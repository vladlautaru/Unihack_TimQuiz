import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import '../css/Question.css'
import ChatBox from './ChatBox'

const questions=[
    {
        question: "Ce râu curge prin Timișoara?",
        answers:[
            {text:"Timișul", correct:false},
            {text:"Bega", correct:true},
            {text:"Crișul", correct:false},
            {text:"Mureșul", correct:false},
        ]
    },
    {
        question: "Ce loc este prezentat in imagine?",
        answers:[
            {text:"Piața Libertății", correct:false},
            {text:"Piața Victoriei", correct:false},
            {text:"Bastionul Maria Theresia", correct:false},
            {text:"Piața Unirii", correct:true},
        ],
        // image: require('./piata_unirii_intrebare.jpg')jpg
    },

    {
        question: "Timișoara drept capitală europeană a culturii a avut sloganul:",
        answers:[
            {text:"Luminează orașul prin tine", correct:true},
            {text:"Luminează și strălucește alături de ceilalți", correct:false},
            {text:"Fă lumină în jurul tău", correct:false},
            {text:"Tu ești lumina orașului", correct:false},
        ]
    },
    {
        question: "Ce semnifică ziua de 16 Decembrie pentru Timișoara?",
        answers:[
            {text:"Dezastrul de la Colectiv", correct:false},
            {text:"Revoluția din 1989", correct:true},
            {text:"Revolta din 1907", correct:false},
            {text:"Încheierea Primulul Război Mondial", correct:false}
        ]
    },
    {
        question: "Care dintre următorii inventatori a fost născut în Timișoara?",
        answers:[
            {text:"Aurel Vlaicu", correct:false},
            {text:"Henri Coandă", correct:false},
            {text:"Victor Babeș", correct:false},
            {text:"Francesco Illy", correct: true}
        ]
    },
    {
        question: "Care este numele cladirii prezentate in imagine?",
        answers:[
            {text:"Palatul Culturii", correct:false},
            {text:"Catedrala Mitropolitana Ortodoxa Romana", correct:false},
            {text:"Sinagoga din Fabric", correct:true},
            {text:"Palatul Apelor", correct:false}
        ],
        // image: require('./sinagoga_fabric.jpg')
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