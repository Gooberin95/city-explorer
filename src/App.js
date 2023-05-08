import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';


class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      searchQuery:'',
      location: {},
      gift: []
    }
  }

  getLocation = async () => {
    const API = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.searchQuery}&format=json`;
    
    const res = await axios.get(API);
    console.log(res.data);
    this.setState({ location:res.data[0] });
    
    console.log(API);
  }

  getForecast = async () => {
    try{
      const url = `${process.env.REACT_APP_SERVER}/weather?searchQuery=Paris&lat=2.3200410217200766&lon=48.8588897`;
      const response = await axios.get(url);
      this.setState({gift: response.data},
        () => console.log(this.state.gift)
        )
    }
    catch(error){
      console.error(error.message);
    }
  }

  render() {
    return(
      <>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Location </Form.Label>
            <Form.Control placeholder="Enter City name:" onChange={(e) => this.setState({ searchQuery: e.target.value })} />
            <Button variant="secondary" onClick={this.getForecast}>Explore!</Button>
          </Form.Group>
          
        </Form>
        <Card style={{ width: '18rem' }}>
        <Card.Img variant="center" src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${this.state.location.lat},${this.state.location.lon}&zoom=<zoom>`} alt={this.state.location.display_name}/>
          <Card.Body>
            <Card.Title>{this.state.location.display_name}</Card.Title>
            <Card.Text>
            <h2>Welcome to my app</h2>

            {`${'Longitutde '}`}{this.state.location.lat}<br></br>
            
            {`${'Latitude '}`} {this.state.location.lon}
            </Card.Text>
            
          </Card.Body>
         </Card>
        
           
          
          
      </>
    )
  }
}

export default App;
