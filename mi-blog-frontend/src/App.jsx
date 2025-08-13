import './App.css';
import PostsList from './PostsList';
import CreatePost from './CreatePost';

function App() {
  return (
    <div className="App">
      <CreatePost />
      <hr />
      <PostsList />
    </div>
  );
}

export default App;