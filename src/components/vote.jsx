import { useContext } from "react";
import { ThreadContext } from "../App";

function Vote({ vote, commentId }) {

    const { thread, setThread } = useContext(ThreadContext)


    const handleVote = (type) => {
        
        setThread((prevThread) => {
            const updatedComments = prevThread.comments.map((comment) => {
                // console.log(comment.user.username, comment.id, commentId);
                
                if (comment.id == commentId) {
                    return {
                        ...comment, 
                        score: type == 'upvote' ? comment.score + 1 : Math.max(0, comment.score - 1)
                    }
                    
                } else {
                    return comment
                }

                
            })

            return {
                ...prevThread,
                comments: updatedComments
            }
        })
    }
    
    
    return (

    <div className="vote-container">
        <img
            className='upvote'
            src="./images/icon-plus.svg"
            alt=""
            onClick={() => handleVote('upvote')}
        />
        <span className="vote-count">{vote}</span>
        <img
            className="downvote"
            src="./images/icon-minus.svg"
            alt=""
            onClick={() => handleVote('downvote')}
        />
    </div>

    );
}

export default Vote;


// const handleVote = (type) => {
//     setThread((prevThread) => {
//       // Create a copy of the comments array
//       const updatedComments = prevThread.comments.map((comment) => {
//         // Find the comment to update
//         if (comment.id === commentId) {
//           return {
//             ...comment,
//             score: type === "upvote" ? comment.score + 1 : comment.score - 1,
//           };
//         }
//         return comment;
//       });

//       // Return the updated thread
//       return {
//         ...prevThread,
//         comments: updatedComments,
//       };
//     });
//   };