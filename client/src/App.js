import logo from './logo.svg';
import './App.css';
import react, { useEffect }  from 'react'
import axios from 'axios'
function App() {
  axios.defaults.baseURL="http://127.0.0.1:8000"
  async function print()
  {
    try{
      let result=await axios.post('/auth/v1/signin',{email:"utsav@gmail.com",password:'Mern@12345'})
      let data= result.data;
      console.log('data is',data)
    }
    catch(err)
    {
      console.log(err.message)
    }
  }
      useEffect(()=>{
       print()
      },[])
  return (
    <div className="App">
      <header className="App-header">
         <h1>Website under the maintenece</h1>
      </header>
    </div>
  );
}

export default App;
