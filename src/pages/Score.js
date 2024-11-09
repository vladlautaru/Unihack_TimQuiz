import React from "react";
import '../css/Score.css';
import Confetti from 'react-confetti';
import {useLocation} from "react-router-dom"; //pt confetti test
import { Link } from 'react-router-dom';


function Score() {
    const location = useLocation();
    const {score} = location.state || {score: 0};
    const [showConfetti, setShowConfetti] = React.useState(false);
    const [showFunFacts, setShowFunFacts] = React.useState(false);


    const funFacts = [
        "The Bega River springs in the Poiana Ruscă Mountains. It flows through the cities of Făget and Timișoara in Romania and the Serbian city of Zrenjanin. It empties into the Tisa River.",

        "Union Square (Piața Unirii) is the oldest historical square in Timișoara, designed in Baroque style. Throughout its history, the square has also been called Hauptplatz, Domplatz, and Losonczy Square. " +
        "The name Union Square was given in 1919, as it was the location where Romanian troops stopped after entering Timișoara.",

        "“Light up the city through yourself!” is a slogan centered around the idea of light, reflecting the journey from individual to a conscious and engaged European citizen, rooted in community values and passion.",

        "The first city free of communism: On December 20, 1989, Timișoara was officially declared the first city free of communism in Romania, marking the beginning of the end for Nicolae Ceaușescu’s regime.",

        "Francesco Illy is known for inventing a revolutionary coffee machine called \"Illetta\" in 1935, considered the first modern espresso machine to use air pressure instead of steam.",

        "The synagogue was built to serve the Jewish community in the Fabric neighborhood, which was very large at the time. In the 19th century, Timișoara had one of the largest Jewish communities in Romania."
    ];

    const handleFunFactsClick = () => {
        setShowConfetti(true);
        setShowFunFacts(prevShow => !prevShow); // Afișează fun facts+sa se inchida
        setTimeout(() => setShowConfetti(false), 4000); //ca la sbmm cu secundele de hold
    };

    return (
        <div className="score">
            {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}
            <div className="derivat">
                <h1 className="h11">Scorul tau:</h1>
                <h2 className="h22">{score}</h2>
                <Link to="/">
                    <button className="button_1">Încearca din nou</button>
                </Link>
                <button className="button_2" onClick={handleFunFactsClick}>Fun facts!</button>
                {/* Afișează fun facts dacă showFunFacts este true */}
                {showFunFacts && (
                    <ul className="fun-facts-list">
                        {funFacts.map((fact, index) => (
                            <li key={index}>{fact}</li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default Score;