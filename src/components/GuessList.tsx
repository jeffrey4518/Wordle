//import { useState, useEffect } from 'react';
import WordRow from './WordRow';

interface Props {
    pastGuesses: string[],
    pastScores: number[][],
    currentGuess: string
}

function GuessList({ pastGuesses, pastScores, currentGuess }: Props) {
    const rows = [];
    
    for (let i = 0; i < 6; i++) {
        if (i < pastGuesses.length) {
            // Attempted row
            rows.push(
                <WordRow key={"r" + i} attempt={i + 1}
                    word={pastGuesses[i]} scores={pastScores[i]} />
            );
        }
        else if (i == pastGuesses.length && currentGuess != "") {
            // Current row
            rows.push(
                <WordRow key={"r" + i} attempt={i + 1}
                    word={currentGuess.padEnd(5, " ")} scores={[-1, -1, -1, -1, -1]} />
            );
        }
        else {
            // Unattempted row
            rows.push(
                <WordRow key={"r" + i} attempt={i + 1}
                    word="     " scores={[-1, -1, -1, -1, -1]} />
            );
        }
    }

    return (
        <div className="guessList">
            {rows}
        </div>
    );
}

export default GuessList;