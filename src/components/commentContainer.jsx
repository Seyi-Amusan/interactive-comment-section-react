import Vote from './vote'
import CommentHeader from "./commentHeader";
import ActionButton from "./actionButtons";

function CommentContainer(props) {
    const { vote, content, user, createdAt } = props

    console.log(user);
    
    
    return (
        <div className="comment-container">
            <Vote vote={vote} />
            <CommentHeader user={user} createdAt={createdAt} />
            <ActionButton src='./images/icon-reply.svg' type='Reply' />
            <p className="comment">{content}</p>
        </div>
    );
}

export default CommentContainer;