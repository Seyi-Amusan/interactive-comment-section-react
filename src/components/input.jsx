

function Input(props) {

  const { value, onChangeHandler, onSubmitHandler, imgSrc, type } = props
  
    return ( 
        <div className='input-container'>

            <img className='input-avatar' src={imgSrc} alt='' />

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
        >{ type ? type : 'send' }</button>
        </div>
        
     );
}

export default Input;