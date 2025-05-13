import { useState } from 'react';
import './../Content/bootstrap.min.css';
import './App.css';
import GuessList from './components/GuessList';
import Keyboard from './components/Keyboard';
import Message from './components/Message';

function App() {
    const [guesses, setGuesses] = useState<string[]>([]);
    const [scores, setScores] = useState<number[][]>([]);
    const [currentGuess, setCurrentGuess] = useState('');
    const [gameStatus, setGameStatus] = useState<any>(-1);

    const handleKeyClick = (key: string) => {
        if (key === 'ENTER') {
            currentGuess.length === 5 ? validateGuess() : alert('Enter a 5-letter word');
        } else if (key === '⌫') {
            setCurrentGuess((prev) => prev.slice(0, -1));
        } else if (currentGuess.length < 5) {
            setCurrentGuess((prev) => prev + key);
        }
    }

    const handleChange = (e: any) => {
        const guess = e.target.value;
        if (guess.toUpperCase() != guess.toLowerCase()) {
            setCurrentGuess(e.target.value.toUpperCase());
        }
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (currentGuess.length !== 5) {
            alert('Enter a 5-letter word');
            return;
        } else {
            validateGuess();
        }
    };

    const validateGuess = async () => {
        try {
            const response = await fetch('https://wordle-apis.vercel.app/api/validate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 'guess': currentGuess })
            });

            if (!response.ok) {
                throw new Error('Server responded with status ${response.status}');
            }

            const data = await response.json();
            if (!data.is_valid_word) {
                alert('Not a valid word')
            }
            else {
                const newGuesses = [...guesses, currentGuess];
                setGuesses(newGuesses);
                setCurrentGuess('');

                const newScores = [...scores, data.score];
                setScores(newScores);

                if (data.score.every((s: number) => s == 2)) {
                    setGameStatus(1);
                } else if (newGuesses.length === 6) {
                    setGameStatus(0);
                }
            }
        }
        catch (err: any) {
            setGameStatus({
                error: 'An error occurred: ' + (err as Error).message
            });
            return;
        }
    }

    const handleRetry = () => {
        window.location.reload();
    };

    return (
        <div className="App card bg-light">
            <h2><b>Wordle</b></h2>
            {gameStatus === 0 ? (
                <div>
                    <button
                        className="btn btn-secondary"
                        onClick={handleRetry}>
                        Retry
                    </button>
                </div>
            ) : (
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            maxLength={5}
                            value={currentGuess}
                            onChange={handleChange}
                            disabled={gameStatus !== -1}
                            autoFocus={true}
                            onBlur={({target}) => target.focus() }
                        />
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={gameStatus !== -1}>
                            Guess
                        </button>
                    </form>
                    <GuessList pastGuesses={guesses} pastScores={scores} currentGuess={currentGuess} />
                    {gameStatus === -1 && <Keyboard onKeyClick={handleKeyClick} />}
                </div>
            )}
            <Message status={gameStatus} />
        </div>
    );
}

export default App;