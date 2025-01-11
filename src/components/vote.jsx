import { useContext } from "react";
import { AppContext } from "../App";

function Vote({ vote, commentId }) {
    const { setThread } = useContext(AppContext);

    const handleVote = (type) => {
        setThread((prevThread) => {
            const updateCommentVote = (comments) => {
                return comments.map((comment) => {
                    if (comment.id === commentId) {
                        let newScore = comment.score;
                        let newVoted = null;
    
                        if (!comment.voted) {
                            // First-time vote
                            newScore = type === "upvote" ? newScore + 1 : newScore - 1;
                            newVoted = type;
                        } else if (comment.voted === type) {
                            // Undo the vote
                            newScore = type === "upvote" ? newScore - 1 : newScore + 1;
                            newVoted = null;
                        } else {
                            // Change vote type
                            newScore =
                                type === "upvote" ? newScore + 2 : newScore - 2;
                            newVoted = type;
                        }
    
                        return {
                            ...comment,
                            score: Math.max(0, newScore),
                            voted: newVoted,
                        };
                    }

                    if (comment.replies && comment.replies.length > 0) {
                        return {
                            ...comment,
                            replies: updateCommentVote(comment.replies)
                        }
                    }

                    return comment
                })

            };

            return {
                ...prevThread,
                comments: updateCommentVote(prevThread.comments),
            };
        });
    };

    return (
        <div className="vote-container">
            <img
                className="upvote"
                src = {`${process.env.PUBLIC_URL}/images/icon-plus.svg`}
                alt="Upvote"
                onClick={() => handleVote("upvote")}
            />
            <span className="vote-count">{vote}</span>
            <img
                className="downvote"
                src = {`${process.env.PUBLIC_URL}/images/icon-minus.svg`}
                alt="Downvote"
                onClick={() => handleVote("downvote")}
            />
        </div>
    );
}

export default Vote;
