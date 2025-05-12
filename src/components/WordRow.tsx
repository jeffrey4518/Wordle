import LetterBlock from "./LetterBlock";

interface Props {
    attempt: number,
    word: string,
    scores: number[]
}

function WordRow({ attempt, word, scores }: Props) {

    const getColor = (score: number) => {
        switch (score) {
            case 0:
                return "gray";
            case 1:
                return "yellow";
            case 2:
                return "green";
            default:
                return "white";
        }
    }

    return (
        <div className="row">
            {word.split('').map((letter, i) => (
                <LetterBlock key={"b" + attempt + i} index={i}
                    letter={letter} color={getColor(scores[i])} />
            ))}
        </div>
    )
}

export default WordRow;