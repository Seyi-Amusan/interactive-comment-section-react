
import { createContext, useEffect, useState } from 'react';
import './App.css';
import CommentContainer from './components/commentContainer';
import Modal from './components/Modal';
import Input from './components/input';

export const AppContext = createContext()

function App() {


  const [thread, setThread] = useState({
    currentUser: {},
    comments: [],
  });

  //state to handle new user comments
  const [newCommentContent, setNewCommentContent] = useState('')

  //state to control modal to confirm comment deletion
  const [showModal, setShowModal] = useState(false)

  //state to identify id of comment to delete
  const [commentId, setCommentId] = useState(0)


  useEffect(() => {
    fetch('./data.json')
      .then(res => res.json())
      .then(data => setThread(data))
  }, [])

  const { currentUser, comments } = thread


  //function to distinguish comments made by logged in user
  const checkIsOwnComment = (commnetAuthor, currentUser) => {
    if (commnetAuthor == currentUser) return true
    return false
  }

  // Function to add a new comment
  const handleAddComment = (content) => {

    //do nothing for empty inputs
    if (!content) return
    
    //creating a new comment object
    const newComment = {
      id: Date.now(), // Unique ID for the new comment
      score: 0, 
      content: content, // The content passed as an argument
      user: currentUser, 
      createdAt: 'Just now',
      isOwnComment: true
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

      <AppContext.Provider value={{ showModal, setShowModal, commentId, setCommentId, thread, setThread}}>
        <div>
          <div className='main'>
            {
              (comments && comments.length > 0)
              ? comments?.map((comment) => {
                const { score, content, id, user, createdAt, replies } = comment
                return (
                  <div key={id}>
                    <CommentContainer
                      key={id}
                      commentId={id}
                      vote={score}
                      content={content}
                      user={user}
                      createdAt={createdAt}
                      isOwnComment={checkIsOwnComment(user.username, currentUser.username)}
                    />

                    {/* if there are replies to the comment node */}

                    {
                      replies && replies.length > 0 && (
                        <div className='replies'>

                          {replies.map((reply) => {

                            const { score, content, id, user, createdAt, replyingTo } = reply

                            // console.log(reply);
                            
                          
                            return <CommentContainer
                              replyComment={true}
                              replyingTo={replyingTo}
                              key={id}
                              commentId={id}
                              vote={score}
                              content={content}
                              user={user}
                              createdAt={createdAt}
                              isOwnComment={checkIsOwnComment(user.username, currentUser.username)}
                            />

                          })}
                        </div>
                      )
                    }
                  </div>
                )
              })
              : <p className='loading'>Loading discussion...</p>
            }
          </div>

          <Input currentUser={currentUser} value={newCommentContent} onChangeHandler={setNewCommentContent} onSubmitHandler={handleAddComment} />
        </div>
        <Modal />
      </AppContext.Provider>
  );
}

export default App;
