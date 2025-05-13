interface Props {
    status: -1 | 0 | 1 | string
}

function Message({ status }: Props) {
    
    return (
        <div className="message">
            {status === 1 ? (
                <h2>
                    <img src="victory.png" />
                    <b>You guessed it!</b>
                    <img src="victory.png" />
                </h2>
            ) : status === 0 ? (
                <h2>
                    <img src="gameover.png" />
                    <b>Game Over!</b>
                    <img src="gameover.png" />
                </h2>
            ) : status != -1 ? (
                <h2>{status}</h2>
            ) : ""}
        </div>
    );
}

export default Message;