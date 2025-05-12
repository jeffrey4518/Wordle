import './../App.css';

interface Props {
    index: number,
    letter: string,
    color: string
}

function LetterBlock({ index, letter, color }: Props) {
    
    return (
        <div key={index} className="block" style={{ backgroundColor: color }}>
            {letter}
        </div>
    );
}

export default LetterBlock;