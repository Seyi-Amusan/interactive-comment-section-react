import { useContext } from "react";
import { ThreadContext } from "../App";

function ActionButton({ isOwnComment, commentId }) {

    const {thread, setThread} = useContext(ThreadContext)

    const handleDeleteComment = () => {
        setThread((prevThread) => {
            const updatedComments = prevThread.comments.filter((comment) => comment.id !== commentId)
            return {
                ...prevThread,
                comments: updatedComments
            }
        })
        
    }
    
    return (
        isOwnComment ? (
            <div className="action-button-group">
                <div className="action-button-container" onClick={handleDeleteComment}>
                    <img
                        className="action-button-icon"
                        src='/images/icon-delete.svg' alt=""
                    />
                    <span className={'action-button-text delete'}>Delete</span>
                </div>
                <div className="action-button-container">
                    <img className="action-button-icon" src='/images/icon-edit.svg' alt="" />
                    <span className={'action-button-text edit'}>Edit</span>
                </div>
            </div>
        ) : (
            <div className="action-button-container">
                <img className="action-button-icon" src='/images/icon-reply.svg' alt="" />
                <span className={'action-button-text reply'}>reply</span>
            </div>
        )
    );
    
    
}

export default ActionButton;