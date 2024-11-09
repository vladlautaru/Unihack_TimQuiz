
import React from 'react';
import '../css/Welcome.css';


function Welcome() {
    return (
        <div className="container">
            <div className="main-menu">
                <ul>
                    <h1 className="hero-heading"></h1>
                </ul>
                <section className="hero">
                    <div className="hero-content">
                        <h1 className="hero-heading">TimQuiz</h1>
                        <div className="vertical-center">
                            <button className="button" role="button">Start</button>
                        </div>

                        <div className="title">TIMISOARA</div>
                        <div className="name">Hai sa descoperim Timisoara!</div>
                        <div className="name2">Esti gata de o noua aventura?</div>
                    </div>
                    <img src={require('../images/imagine-timisoara2.jpg')} className="image2" alt="Timisoara 2"/>
                    <img src={require('../images/imagine-timisoara3.jpg')} className="image3" alt="Timisoara 3"/>
                </section>
            </div>
        </div>
    );
}

export default Welcome;