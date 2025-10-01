import { useState } from 'react'
import './App.css'
import Nav from "./components/Navbar"
import nprogress from 'nprogress'
import axios from 'axios'

function App() {
  const [output, setOutput] = useState('')
  const [input, setInput] = useState({shortURL:'', longURL:''})


  const handleChange = (e) =>{
    setInput({...input, [e.target.name]: e.target.value})
  }

  const handleSubmit = async () => {
    console.log('request sent...');
    if (input.longURL !== '') {
      try {
        nprogress.start(); 

        const response = await axios.post(`https://tinycut-pbtb.onrender.com/shortURL`,input);
        setOutput(response.data);
        setInput({ shortURL: '', longURL: '' });
      } catch (err) {
        console.error(err);
        alert('Something went wrong!');
      } finally {
        nprogress.done(); 
      }
    } else {
      alert('Please Enter URL!');
    }
  };

  return (
    <>
    <Nav/>
      <div className="TinyCut">TinyCut</div>
      <div className="container">
        <div className="mainBox">
          <form>
            <input type='text' name='longURL' value={input.longURL} placeholder='Enter Complete URL Here' className='urlInput' onChange={handleChange} required/>
          </form>
          <button type='submit' onClick={handleSubmit}>Create</button>
          <div className="url">
            <a href={output} target='_blank'  className="urlOutput">{output}</a>
          </div>
        </div>
      </div>
      <div className="footer">
        Solution to make your links shorter
      </div>
      <p style={{fontSize:"12px", color:"gray", textAlign:"center", marginLeft:"3px", position:"fixed", bottom:"20px", width: "200px"}}>
        Note: This website is for demo purposes only. It uses an in-memory H2 database and does not persist any data.
    </p>
    </>
  )
}

export default App
