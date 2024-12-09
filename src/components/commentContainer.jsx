import Vote from './vote'
import CommentHeader from "./commentHeader";
import ActionButton from "./actionButtons";
import Input from './input';
import { useState } from 'react';

function CommentContainer(props) {

    const [showInput, setShowInput] = useState(false)

    const { vote, content, user, createdAt, replyComment, replyingTo, isOwnComment, commentId } = props

    const displayInput = () => {
        console.log('clicked');
        setShowInput(true)
    }
    
    return (
        <>
            
            <div className={`comment-container ${replyComment ? 'reply-comment-container' : ''}`}>
                <Vote vote={vote} commentId={commentId} />
                <CommentHeader user={user} createdAt={createdAt} isOwnComment={isOwnComment} />
                <ActionButton isOwnComment={isOwnComment} commentId={commentId} onClickHandler={ displayInput } />
                <p className="comment">
                    {replyingTo && <span className="replying-to">@{replyingTo}</span>} {content}
                </p>
            </div>
            

            {showInput && <Input />}
            
        </>
       
    
    
        

    );
}

export default CommentContainer;