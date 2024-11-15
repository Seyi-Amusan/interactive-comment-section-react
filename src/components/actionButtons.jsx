function ActionButton(props) {

    const { src, type } = props
    
    return (
        <div className="action-button-container">
            <img className="action-button-icon" src={ src } alt="" />
            <span className={`action-button-text ${type ? type : ''}`}>{ type }</span>
        </div>
    );
}

export default ActionButton;