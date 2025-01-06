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
    const [showEditInput, setShowEditInput] = useState(false)
    const [editInputValue, setEditInputValue] = useState(content)
    const [replyInputValue, setReplyInputValue] = useState('')
    

    const handleEditComment = (value) => {

        
        setThread((prevThread) => {

            const updateComments = (comments) => {
                return comments.map((comment) => {
                    if (comment.id === commentId) {
                        return {
                            ...comment,
                            content: value
                        } 
                    } else if(comment.replies && comment.replies.length > 0) {
                        return {
                            ...comment,
                            replies: updateComments(comment.replies)
                        }
                    } return comment
                })
            }
    
            return {
                ...prevThread,
                comments: updateComments(prevThread.comments)
            }
        })

        setShowEditInput(false)
        
    }

    const handleReplyToComment = (value) => {

        //do nothing for empty inputs and remove reply input container
        if (!value) setShowReplyInput(false)

        

        //update thread for rerender
        setThread((prevThread) => {

            // Recursive function to locate and append reply
            const addReply = (comments) => {
                return comments.map((comment) => {
        
                    // Create the new reply object
                    const newReply = {
                        id: Date.now(), // Unique ID
                        score: 0,
                        content: value, // Content for reply
                        replyingTo: comment.user.username, // Username being replied to
                        user: currentUser,
                        createdAt: 'Just now',
                        isOwnComment: true
                    };
        
                    // Check if this is the target comment or reply
                    if (comment.id === commentId) {
                        // Append directly to the existing replies array
                        return {
                            ...comment,
                            replies: [...comment.replies, newReply] // Keep replies flat
                        };
                    }
        
                    // Recursively check nested replies
                    if (comment.replies && comment.replies.length > 0) {
                        return {
                            ...comment,
                            replies: addReply(comment.replies) // Dive deeper if needed
                        };
                    }
        
                    return comment; // Return unchanged if no match
                });
            };
        
            // Update thread with appended replies
            return {
                ...prevThread,
                comments: addReply(prevThread.comments)
            };
        });
        
        

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
                        type == 'edit' && setShowEditInput(true)
                        }
                    }
                />

                <div className='comment-box'>
                    {
                        showEditInput ? (
                            <div className='edit-container'>
                                <textarea
                                    className='edit-input-container'
                                    value={editInputValue}
                                    onChange={(event) => setEditInputValue(event.target.value)}
                                    onKeyDown={(event) => {
                                        if (event.key == 'Enter' && !event.shiftKey) {
                                            event.preventDefault()
                                            handleEditComment(editInputValue, thread)
                                        }
                                    }}
                                />

                                <button className='update-button'
                                    onClick={(event) => {
                                        event.preventDefault()
                                        handleEditComment(editInputValue, thread)
                                    }}
                                >update</button>
                            </div> 
                        ):
                        <p className='comment'>
                            {replyingTo && <span className="replying-to">@{replyingTo}</span>} {content}
                        </p>
                    }
                </div>
            </div>
            

            {
                showReplyInput && <Input imgSrc={currentUser.image.png} value={replyInputValue} onChangeHandler={setReplyInputValue} type='reply' onSubmitHandler={handleReplyToComment} />
            }
            
        </>
       
    );
}

export default CommentContainer;