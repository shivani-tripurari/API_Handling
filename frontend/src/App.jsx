import {useEffect,useState} from 'react';
import './App.css';
import axios from 'axios';

function App() {
  
  const [places, setPlaces] = useState([]);
  const [search, setSearch] = useState();

  const[error,setError] = useState(false); //good practice to use useState hook for handling error inside catch block
  const[loading,setLoading] =useState(true); //to know if the data is being loading i.e, there's no error but it will take some time.

  useEffect(()=>{

    const controller = new AbortController(); //i have doubts in controller part

//imediately invoked functions(ifi) to use  async-await inside hooks
    ;(async()=>{        //use ; before function definition to delete previous code if any. It's a good practice to use it before ifi
      try {
        setLoading(true);//first the api will be loaded
        setError(false); //if there was an error and error was set to true because of catch bock and if there is another call, error should be set to true first.
        const response = await axios.get('/api/places?search=' + search,
          {signal: controller.signal}); //the last signal part you can ignore as of now
        console.log(response.data); //this will print the data within our api
        setPlaces(response.data); //sets new value for places
        setLoading(false); //this is set to false after we get the data.
      } catch (error) {
        if(axios.isCancel(error)){
          console.log('Request cancelled',error.message);
          return;
        }
        setError(true);
        setLoading(false); //we again set loading to false if we encounter error because api was called but there was an error.
      }
    })()

    //clean-up method ---> to unmount event handlers
    return()=>{
      controller.abort();
    }

  },[search]);


  //this if block will be executed only when error=true. This means there was error wj=hile fetching data from api and error message will be diplayed to user.
  if(error){
    return(<>
      <h1>Something went wrong!!!</h1> 
    </>);
  }

  //to show that data is loading . Loading will take place for 3sec
  if(loading){
    return(<>
      <h1>Loading...</h1>
    </>);
  }


  const filteredPlaces = places.filter(place =>
    place.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <h1>Places to visit with you Mr Vishnu</h1>
      <h2>Number of places: {places.length}</h2>
      <input 
        type="text" 
        placeholder='search' 
        value={search}
        onChange={(e)=>setSearch(e.target.value)} 
      />
      <div className='place-cards-container'>
      {filteredPlaces.length > 0 ? (
          filteredPlaces.map(place => (
            <div key={place.id} className='place-card'>
              <img src={place.image} alt={place.name} className='place-image' />
              <h3 className='place-name'>{place.name}</h3>
              <p className='place-rating'>Rating: {place.rating}</p>
            </div>
          ))
        ) : (
          <p>No places found matching {search}</p>
        )}
      </div>
    </>
  )
}

export default App




/*Here, we are using 3 useState hooks and 1 useEffect hook. 
They are like a template and are generally used in production.
So, we can write a seperate function where we use all these hooks and return them. 
And call it in our main App function.*/

/*
  const customReactQuery(urlPath)=>{                   //a generic urlPath will be used and we will call customReactQuery in the main App function
    const[places,setPlaces]=useState([]);
    const[error,setError]=useState(false);
    const[loading,setLoading]=useState(true);

    useEffect(()=>{

      ;(async()=>{
        try{
          setLoading(true);
          setError(false);
          const response = await axios.get(urlPath);
          console.log(response.data);
          setLoading(false);
        } catch(error){
          setError(true);
          setLoading(false);
        }
      })()  //ifi

    },[])  //useEffect close

    return[places, error, loading];

  }

  --------------------App function-----------------
  function App(){

  //calling our custom function 
  const[places,error,loading] = customReactQuery('/api/places'); ---> Write your api url here!!!



  }
*/ 