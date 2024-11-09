import React, {useState} from "react";
import '../css/Question.css';
import {useNavigate} from "react-router-dom";

const questions = [
    {
        text: "What is 16th of Deember associated with in Timisoara?",
        answers: [
            {
                text: "Protests against OUG 13",
                correct: false
            },
            {
                text: "The 1989 Revolution",
                correct: true
            },
            {
                text: "The 1907 Peasant Uprising",
                correct: false
            },
            {
                text: "Ending of the First World War",
                correct: false
            }
        ]
    },
    {
        text: "Which of the following inventors was born in Timisoara?",
        answers: [
            {
                text: "Louis Pasteur",
                correct: false
            },
            {
                text: "Petrache Poenaru",
                correct: false
            },
            {
                text: "James Watt",
                correct: false
            },
            {
                text: "Francesco Illy",
                correct: true
            }
        ]
    }
];

function Question () {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentScore, setCurrentScore] = useState(0);
    const [answers, setAnswers] = useState(Array(questions.length));

    const navigate = useNavigate();

    const handleAnswer = (correct) => {
        const nextQuestionIndex = currentQuestionIndex + 1;
        const nextScore = currentScore + (correct) ? 10 : 0;

        setAnswers((prevAnswers) => {
            const updatedAnswers = [...prevAnswers];
            updatedAnswers[currentQuestionIndex] = correct;
            return updatedAnswers;
        });

        setCurrentScore(nextScore);

        if (nextQuestionIndex < questions.length) {
            setCurrentQuestionIndex(nextQuestionIndex);
        }

        console.log("score: " + currentScore);
        console.log("question:" + currentQuestionIndex);
        console.log("array: " + answers.toString());
    }

    return(
        <div>
            <h1>TimQuiz</h1>
            <h2>{questions[currentQuestionIndex].text}</h2>
            <button onClick={() => handleAnswer(questions[currentQuestionIndex].answers[0].correct)}>
                {questions[currentQuestionIndex].answers[0].text}</button>
            <button onClick={() => handleAnswer(questions[currentQuestionIndex].answers[1].correct)}>
                {questions[currentQuestionIndex].answers[1].text}</button>
            <button onClick={() => handleAnswer(questions[currentQuestionIndex].answers[2].correct)}>
                {questions[currentQuestionIndex].answers[2].text}</button>
            <button onClick={() => handleAnswer(questions[currentQuestionIndex].answers[3].correct)}>
                {questions[currentQuestionIndex].answers[3].text}</button>
        </div>
    );
}

export default Question;