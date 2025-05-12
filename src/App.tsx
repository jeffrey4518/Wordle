import { useState } from 'react';
import './App.css';
import './components/GuessList';
import GuessList from './components/GuessList';

function App() {
    const [guesses, setGuesses] = useState<string[]>([]);
    const [scores, setScores] = useState<number[][]>([]);
    const [currentGuess, setCurrentGuess] = useState('');
    const [gameStatus, setGameStatus] = useState('');

    const handleChange = (e: any) => {
        setCurrentGuess(e.target.value.toUpperCase());
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (currentGuess.length !== 5) {
            alert('Enter a 5-letter word');
            return;
        }
        
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
                    setGameStatus('🎉 You guessed it!');
                } else if (newGuesses.length === 6) {
                    setGameStatus('😢 Game over!');
                }
            }
        }
        catch (err) {
            setGameStatus('An error occurred: ${(err as Error).message}');
            return;
        }
    };
    
    return (
        <div className="App">
            <h1>Wordle</h1>
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

            <GuessList pastGuesses={guesses} pastScores={scores} currentGuess={currentGuess} />
            {gameStatus && <h2>{gameStatus}</h2>}
        </div>
    );
}

export default App;