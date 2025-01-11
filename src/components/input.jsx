

function Input(props) {

  const { value, onChangeHandler, onSubmitHandler, imgSrc, type } = props

  // console.log(imgSrc == '/interactive-comment-section-react/./images/avatars/image-juliusomo.png');
  
  
    return ( 
        <div className='input-container'>

            <img className='input-avatar' src='/interactive-comment-section-react/./images/avatars/image-juliusomo.png' alt='' />

            <textarea
              placeholder='Add comment...'
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