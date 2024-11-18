function renderActionButton(iconSrc, text, className) {
    return(
     <div className="action-button-container">
        <img className="action-button-icon" src={iconSrc} alt="" />
        <span className={`action-button-text ${className}`}>{text}</span>
    </div>)
};

function ActionButton({ isOwnComment }) {
    
    return (
        isOwnComment ? (
            <div className="action-button-group">
                {renderActionButton('./images/icon-delete.svg', 'Delete', 'delete')}
                {renderActionButton('./images/icon-edit.svg', 'Edit', 'edit')}
            </div>
        ) : (
            renderActionButton('./images/icon-reply.svg', 'Reply', 'reply')
        )
    );
    
    
}

export default ActionButton;