import Vote from './vote'
import CommentHeader from "./commentHeader";
import ActionButton from "./actionButtons";
import Input from './input';
import { useState } from 'react';

import { useContext } from "react";
import { AppContext } from "../App";


function CommentContainer(props) {

    const { vote, content, user, createdAt, replyComment, replyingTo, isOwnComment, commentId } = props

    const { currentUser, thread, setThread } = useContext(AppContext)

    const [showReplyInput, setShowReplyInput] = useState(false)

    const [inputValue, setInputValue] = useState('')



    const handleEditComment = () => {
        console.log('edit function call');

        console.log(commentId);
        
    }

    const handleReplyToComment = (value) => {

        //do nothing for empty inputs and remove reply input container
        if (!value) setShowReplyInput(false)

        const updatedComments = thread.comments.map((comment) => {
            if (comment.id == commentId) {

                //create a new reply comment object
                const newReply = {
                    id: Date.now(), // Unique ID for the new comment
                    score: 0, 
                    content: value, // The content passed as an argument
                    replyingTo:  comment.user.username,
                    user: currentUser, 
                    createdAt: 'Just now',
                    isOwnComment: true
                };
                
                return {
                    ...comment,
                    replies: [...(comment.replies || []), newReply]
                }
            }
            return comment
        })

        //update thread for rerender
        setThread((prevThread) => {
            return {
                ...prevThread,
                comments: updatedComments
            }
        })

        //remove reply input container
        setShowReplyInput(false)
      };
    
    return (
        <>
            
            <div className={`comment-container ${replyComment ? 'reply-comment-container' : ''}`}>
                <Vote vote={vote} commentId={commentId} />
                <CommentHeader user={user} createdAt={createdAt} isOwnComment={isOwnComment} />
                <ActionButton isOwnComment={isOwnComment} commentId={commentId}
                    onClickHandler={(type) =>
                        {
                            type == 'reply' && setShowReplyInput(true)
                        }
                    }
                />
                <p className="comment">
                    {replyingTo && <span className="replying-to">@{replyingTo}</span>} {content}
                </p>
            </div>
            

            {
                showReplyInput && <Input imgSrc={currentUser.image.png} value={inputValue} onChangeHandler={setInputValue} type='reply' onSubmitHandler={handleReplyToComment} />
            }
            
        </>
       
    
    
        

    );
}

export default CommentContainer;