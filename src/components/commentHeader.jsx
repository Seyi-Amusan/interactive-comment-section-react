function CommentHeader(props) {
    
    const {user, createdAt, isOwnComment} = props
 
    return (
        <div className='comment-header-container'>
            <img className="avatar" src={user.image.png} alt="" />
            <h2 className="username">{user.username}</h2>
            {
                isOwnComment && <span className="you">you</span>
            }
            <p className="created-at">{createdAt}</p>
        </div>
    );
}

export default CommentHeader;