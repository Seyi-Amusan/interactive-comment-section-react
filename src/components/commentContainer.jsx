import Vote from './vote'
import CommentHeader from "./commentHeader";
import ActionButton from "./actionButtons";

function CommentContainer(props) {
    const { vote, content, user, createdAt, replyComment, replyingTo, isOwnComment, commentId } = props
    // console.log(commentId);
    
    return (
        <div className={`comment-container ${replyComment ? 'reply-comment-container' : ''}`}>
            <Vote vote={vote} commentId={commentId} />
            <CommentHeader user={user} createdAt={createdAt} isOwnComment={isOwnComment} />
            <ActionButton isOwnComment={isOwnComment} commentId={commentId} />
            <p className="comment">
                {replyingTo && <span className="replying-to">@{replyingTo}</span>} {content}
            </p>
        </div>
    );
}

export default CommentContainer;