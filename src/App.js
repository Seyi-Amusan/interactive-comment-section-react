
import { useEffect, useState } from 'react';
import './App.css';
import CommentContainer from './components/commentContainer';


function App() {

  const [thread, setThread] = useState({
    currentUser: {},
    comments: []
  })

  //state to handle new user comments
  const [newCommentContent, setNewCommentContent] = useState('')


  useEffect(() => {
    fetch('./data.json')
      .then(res => res.json())
      .then(data => setThread(data))
  }, [])

  useEffect(() => {
    console.log(thread.currentUser);
  }, [thread])

  const { currentUser, comments } = thread


  // Function to add a new comment
  const handleAddComment = (content) => {

    //do nothing for empty comments
    if (!content) return
    
    //creating a new comment object
    const newComment = {
      id: Date.now(), // Unique ID for the new comment
      score: 0, 
      content: content, // The content passed as an argument
      user: currentUser, 
      createdAt: 'Just now',
      isOwnComment: true //if comment is made by logged in user
    };
  
    //update the thread state with new commnet object
    setThread((prevThread) => {
      return {
        ...prevThread,
        comments: [...(prevThread.comments || []), newComment], // Append the new comment to the state object
      };
    });

    //clear the text area
    setNewCommentContent('')
  };


    return (
      
      <div>
        <div className='main'>
          {
            comments?.map((comment) => {
              const { score, content, id, user, createdAt, replies, isOwnComment=false } = comment
              return (
                <div key={id}>
                  <CommentContainer
                    key={id}
                    vote={score}
                    content={content}
                    user={user}
                    createdAt={createdAt}
                    isOwnComment={isOwnComment}
                  />

                  {/* if there are replies to the comment node */}

                  {
                    replies && replies.length > 0 && (
                      <div className='replies'>

                        {replies.map((reply) => {

                          const { score, content, id, user, createdAt, replyingTo } = reply
                        
                          return <CommentContainer
                            replyComment={true}
                            replyingTo={replyingTo}
                            key={id}
                            vote={score}
                            content={content}
                            user={user}
                            createdAt={createdAt}
                          />

                        })}
                      </div>
                    )
                  }
                </div>
              )
            })
          }
        </div>

        <div className='input-container'>

          <img className='input-avatar' src={currentUser.image?.png} alt='' />

          <textarea
            placeholder='Add a comment...'
            value={newCommentContent}
            onChange={(event) => setNewCommentContent(event.target.value)}
            onKeyDown={(event) => {
              if (event.key == 'Enter' && !event.shiftKey) {
                event.preventDefault()
                handleAddComment(newCommentContent)
              }
            }}
          />

          <button
            className='send-button'
            onClick={() => handleAddComment(newCommentContent)}
          >send</button>
        </div>
    </div>
  );
}

export default App;
