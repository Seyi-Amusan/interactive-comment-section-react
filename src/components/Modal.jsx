import { useContext } from "react";
import { AppContext } from "../App";


function Modal() {

    const { setThread, showModal, setShowModal, commentId } = useContext(AppContext)

    const handleDeleteComment = (commentId) => {
        //update comments array for rerender
        setThread((prevThread) => {

            const updateComments = ((comments) => {
                return comments
                    .filter((comment) => !(comment.id == commentId))
                    .map((comment) => {
                        if (comment.replies && comment.replies.length > 0) {
                            return {
                                ...comment,
                                replies: updateComments(comment.replies)
                            }
                        }
                        return comment
                    })
            })
            
            return {
                ...prevThread,
                comments: updateComments(prevThread.comments)
            }
        })

    }

    return ( 
        <div className='modal-bg' id={!showModal ? 'hidden' : ''}>
            <div className="modal-container">
                <h2 className="modal-header">Delete Comment</h2>
                <p className="modal-text">
                    Are you sure you want to delete this comment? 
                    This will remove the comment and can't be undone.
                </p>
                <div className="modal-button-group">
                    <button className="cancel-delete-button" onClick={() => setShowModal(false)}>no, cancel</button>
                    <button className="confirm-delete-button" onClick={() => {
                        handleDeleteComment(commentId) //delete comment
                        setShowModal(false) //remove modal
                    }}>yes, delete</button>
                </div>
            </div>
        </div>
     );
}

export default Modal;