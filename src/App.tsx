import { useState } from 'react';
import './App.css';

const WORD = 'REACT'; // secret word

function App() {
    const [guesses, setGuesses] = useState<string[]>([]);
    const [currentGuess, setCurrentGuess] = useState('');
    const [gameStatus, setGameStatus] = useState('');

    const handleChange = (e: any) => {
        setCurrentGuess(e.target.value.toUpperCase());
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (currentGuess.length !== 5) {
            alert('Enter a 5-letter word');
            return;
        }
        if (guesses.length >= 6) return;

        const newGuesses = [...guesses, currentGuess];
        setGuesses(newGuesses);
        setCurrentGuess('');

        if (currentGuess === WORD) {
            setGameStatus('?? You guessed it!');
        } else if (newGuesses.length === 6) {
            setGameStatus(`?? Game over! The word was ${WORD}`);
        }
    };

    const getColor = (letter: any, index: any) => {
        if (WORD[index] === letter) return 'green';
        if (WORD.includes(letter)) return 'yellow';
        return 'gray';
    };

    return (
        <div className="App">
            <h1>Wordle Clone</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    maxLength={5}
                    value={currentGuess}
                    onChange={handleChange}
                    disabled={gameStatus ? true : false}
                />
                <button type="submit" disabled={gameStatus ? true : false}>Guess</button>
            </form>
            <div className="grid">
                {guesses.map((guess, i) => (
                    <div key={i} className="row">
                        {guess.split('').map((letter, j) => (
                            <div
                                key={j}
                                className="cell"
                                style={{ backgroundColor: getColor(letter, j) }}
                            >
                                {letter}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            {gameStatus && <h2>{gameStatus}</h2>}
        </div>
    );
}

export default App;