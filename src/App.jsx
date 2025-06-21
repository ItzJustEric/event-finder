import { use, useState } from 'react'
import './App.css'
import './searchInput.css'

function App() {
  const [value, setValue] = useState('')
  const [events, setEvents] = useState([])


  // Function to handle search button click
  const handleSubmit = async () => {
    if(value.trim() === '') {
      //sets window alert if input is empty
      alert('Please enter a location to search for events.');

    }

    try {
      const url = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=w1zzxSjYuwxLFbm3r8HcObICuxTiRSMS&city=" + value;
      const response = await fetch(url)
      const data = await response.json()
      console.log('Fetched events:', data);
      
      if (data._embedded && data._embedded.events) {
        setEvents(data._embedded.events);
      } else {
        setEvents([])
        alert('No events found for the specified location.');
      }

  }
  catch (error) {
    console.error('Error fetching events:')
    console.error(error);
    alert('An error occurred while fetching events. Please try again later.');

  }
  }
  


  return (
    <div className="landing-bg">
      <div className="app-container landing-card">
        <h1 className="main-title">
          Discover Amazing <span className="highlight">Events</span><br />Near you
        </h1>
        <p className="subtitle">
          Find events, concerts, and activities happening in your city. <br />
          Enter a location to get started!
          
        </p>
        <div className='search-container'>
          <input
            type="text"
            placeholder='Enter your location...'
            className='search-input'
            value={value}
            // on change event to update the state
            
            onChange={e => setValue(e.target.value)}
          />
          <button className='search-btn' onClick={handleSubmit}>🔍Search</button>
          {events.length > 0 && ( 
          <div className="event-list"> 
          {events.map(event => {
            return(

            <div className='event-card' key={event.id}>
              {event.images && event.images.length > 0 && (
                <a href={event.url}><img src={event.images[0].url} alt={event.name} /> </a>
              )}
              <p>{event.name}</p>
              
            </div>
            )
          
        })}

          </div>
             )}

        </div>
      </div>
    </div>
  )
}


export default App;
