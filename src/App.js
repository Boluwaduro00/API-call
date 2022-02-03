import './App.css';
import { useEffect, useState } from 'react';
import { FaUserAlt, FaMapMarkerAlt } from "react-icons/fa";


function App() {
  const [name, setName] = useState('');
  const [userName, setUsername] = useState('');
  const [avatar, setAvatar] = useState('');
  const [followers, setFollowers] = useState('');
  const [following, setFollowing] = useState('');
  const [repos, setRepos] = useState('');
  const [userInput, setUserInput] = useState('');
  const [location, setLocation]= useState('');



  const setData = ({name, login, followers, following, public_repos, avatar_url, location}) => {
    setName(name)
    setUsername(login)
    setFollowers(followers)
    setFollowing(following)
    setRepos(public_repos)
    setAvatar(avatar_url)
    setLocation(location)
  }

  const handleChange = (e) => {
    setUserInput(e.target.value)
  }

  const handleSubmit = (e) => {
    if (e && e.preventDefault) { e.preventDefault(); }
    fetch(`https://api.github.com/users/${userInput}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (!userInput) return;
        // setUsers(data);
        setData(data);
      }).catch(error => {
        console.log(error)
      })   
  }

  useEffect(()=> {
    handleSubmit();
  },[]);
  
  
  return (
    <div className="App">
      <div className="navbar">
        Github Search
      </div>

      <div className="search">
        <form onSubmit={handleSubmit} >
          <input 
          className='search-input' 
          type="text" 
          placeholder='Github User'
          value={userInput}
          onChange={handleChange} 
          />
          <button type='submit'>Search</button>
        </form>
      </div>
      
       <div className="container">
       <div className='card'>
        <img src={avatar} alt="" />
        <div className="details">
          <h3>{name}</h3>
          <h3> {userName}</h3>
          <div className="description">
            <ul>
              <li><FaUserAlt/> {repos} Repos</li>
              <li><FaUserAlt/> {followers} followers</li>
              <li><FaUserAlt/> {following} following</li>
              <li><FaMapMarkerAlt/> {location} </li>
            </ul>
          </div>
        </div>
       </div>
       </div>
    </div>
  );
}

export default App;
