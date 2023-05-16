import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Conditions from './conditions.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieData from './movieData.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      location: {},
      gift: [],
      movies: [],
      videoStats: []

    }
  }

  getLocation = async () => {
    const API = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.searchQuery}&format=json`;
    
    const res = await axios.get(API);
    console.log(res.data);
    this.setState({ location: res.data[0] }); //this is not available globally yet , so you must access lat and lon through arguments inside getForecast function call

    console.log(`${this.state.location}`);
    this.getWeather(res.data[0].lat, res.data[0].lon);
    this.getMovies(this.state.searchQuery);
  }

  getMovies = async (searchQuery) => {
    console.log(searchQuery);
    try {
      const url = `${process.env.REACT_APP_SERVER}/movies?searchQuery=${searchQuery}`;
      const response = await axios.get(url);
      console.log(response)
      this.setState({ movies: response.data },
        () => console.log(`${this.state.movies}`)
      )
    }
    catch (error) {
      console.error(error.message);

    }


  }

  getWeather = async (lat, lon) => {
    try {
      const url = `${process.env.REACT_APP_SERVER}/weather?lat=${lat}&lon=${lon}`;
      console.log(url);
      const response = await axios.get(url);
      
      this.setState({ gift: response.data },
        () => console.log(this.state.gift)
      )

    }
    catch (error) {
      console.error(error.message);

    }
  }

  render() {

    return (
      <>
        <Form>
          <Form.Group className = "text-center">
            <Form.Label>Location&Facts.org</Form.Label>
            <Form.Control placeholder="Enter City name:" onChange={(e) => this.setState({ searchQuery: e.target.value })} />
            <Button variant="secondary" onClick={this.getLocation}>Explore!</Button>
          </Form.Group>

        </Form>
        <Card className = "text-center">
          
          <Card.Body>
            <Card.Title>{this.state.location.display_name}</Card.Title>
            <Card.Text>
              <h2>Destination & Facts</h2>

              {`${'Latitude '}`}{this.state.location.lat}<br></br>
              {`${'Longitutde '}`}{this.state.location.lon}<br></br>



            </Card.Text>

          </Card.Body>
        </Card>

        <hr></hr>
       
          {this.state.gift.map(item =>
            <>
              <Conditions con={item} />
            
            </>
     
        
        
          )
        }
    
          {this.state.movies.map(item =>
            <>
             <MovieData vids={item}/>
            
            </>
     
        
        
          )
        }
      
      </>
    )
  }
}



export default App;
