function Input(props) {

    const {currentUser, value, onChangeHandler, onSubmitHandler} = props
    return ( 
        <div className='input-container'>

            <img className='input-avatar' src={currentUser?.image?.png} alt='' />

            <textarea
              placeholder='Add a comment...'
              value={value}
              onChange={(event) => onChangeHandler(event.target.value)}
              onKeyDown={(event) => {
                if (event.key == 'Enter' && !event.shiftKey) {
                  event.preventDefault()
                  onSubmitHandler(value)
                }
              }}
            />

            <button
              className='send-button'
              onClick={() => onSubmitHandler(value)}
            >send</button>
        </div>
        
     );
}

export default Input;