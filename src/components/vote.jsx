function Vote({vote}) {
    return (

    <div className="vote-container">
        <img className='upvote' src="./images/icon-plus.svg" alt="" />
        <span className="vote-count">{vote}</span>
        <img className="downvote" src="./images/icon-minus.svg" alt="" />
    </div>

    );
}

export default Vote;