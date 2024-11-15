
import { useEffect, useState } from 'react';
import './App.css';
import CommentContainer from './components/commentContainer';


function App() {

  const [thread, setThread] = useState({
    currentUser: {},
    comments: []
  })

  useEffect(() => {
    fetch('./data.json')
      .then(res => res.json())
      .then(data => setThread(data))
  }, [])

  useEffect(() => {
    console.log(thread.comments[0]);
  }, [thread])

  const { currentUser, comments } = thread

  return (
    <div>
      <div className='main'>
        {
          comments?.map((comment) => {
            const { score, content, id, user, createdAt } = comment
            return <CommentContainer
              key={id}
              vote={score}
              content={content}
              user={user}
              createdAt={createdAt}
            />
          })
        }
      </div>
    </div>
  );
}

export default App;
