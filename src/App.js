import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';


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
     this.getForecast(res.data[0].lat, res.data[0].lon);
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

  getForecast = async (lat, lon) => {
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
          <Form.Group className="mb-3">
            <Form.Label>Location </Form.Label>
            <Form.Control placeholder="Enter City name:" onChange={(e) => this.setState({ searchQuery: e.target.value })} />
            <Button variant="secondary" onClick={this.getLocation}>Explore!</Button>
          </Form.Group>

        </Form>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="center" />
          <Card.Body>
            <Card.Title>{this.state.location.display_name}</Card.Title>
            <Card.Text>
              <h2>Welcome to my app</h2>

              {`${'Longitutde '}`}{this.state.location.lat}<br></br>




            </Card.Text>

          </Card.Body>
        </Card>


        {this.state.gift.length > 0 &&
          this.state.gift.map(item =>
            <>
              <Container>
                <Row>
                  <Col sm={4}>{item.date}</Col>
                  <Col sm={4}>{item.temp}</Col>
                  <Col sm={4}>{item.description}</Col>
                </Row>
              
              </Container>
            
            </>
     
        
        
          )
        }
        {this.state.movies.length > 0 &&
          this.state.movies.map(item =>
            <>
              <Container>
                <Row>
                  <hr></hr>
                  <Col sm={14}>Movie Title: {item.title}</Col>
                  <Col sm={14}>Movie overview: {item.overview}</Col>
                  <Col sm={14}>Movie Popularity: {item.popularity}</Col>
                  
                </Row>
              
              </Container>
            
            </>
     
        
        
          )
        }
      
      </>
    )
  }
}



export default App;
