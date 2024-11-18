import Vote from './vote'
import CommentHeader from "./commentHeader";
import ActionButton from "./actionButtons";

function CommentContainer(props) {
    const { vote, content, user, createdAt, replyComment, replyingTo, isOwnComment } = props
    
    return (
        <div className={`comment-container ${replyComment ? 'reply-comment-container' : ''}`}>
            <Vote vote={vote} />
            <CommentHeader user={user} createdAt={createdAt} />
            <ActionButton isOwnComment={isOwnComment} />
            <p className="comment">
                {replyingTo && <span className="replying-to">@{replyingTo}</span>} {content}
            </p>
        </div>
    );
}

export default CommentContainer;