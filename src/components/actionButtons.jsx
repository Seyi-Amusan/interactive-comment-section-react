import { useContext } from "react";
import { AppContext } from "../App";

function ActionButton({ isOwnComment, commentId, onClickHandler }) {

    const { setCommentId, setShowModal } = useContext(AppContext)
    
    return (
        isOwnComment ? (
            <div className="action-button-group">

                <div className="action-button-container" onClick={() => {
                    setShowModal(true) // display comment deletion modal
                    setCommentId(commentId) // set id of comment to delete
                }}>
                    <img
                        className="action-button-icon"
                        src='/images/icon-delete.svg' alt=""
                    />
                    <span className={'action-button-text delete'}>Delete</span>
                </div>

                <div className="action-button-container" onClick={()=> {onClickHandler('edit')}}>
                    <img className="action-button-icon" src='/images/icon-edit.svg' alt="" />
                    <span className={'action-button-text edit'}>Edit</span>
                </div>

            </div>
        ) : (
            <div className="action-button-container" onClick={() => {onClickHandler('reply')}}>
                <img className="action-button-icon" src='/images/icon-reply.svg' alt="" />
                <span className={'action-button-text reply'}>reply</span>
            </div>
        )
    );
    
    
}

export default ActionButton;