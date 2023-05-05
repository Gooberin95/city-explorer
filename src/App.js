import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      searchQuery:'',
      location: {}
    }
  }

  getLocation = async () => {
    const API = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.searchQuery}&format=json`;
    
    const res = await axios.get(API);
    console.log(res.data);
    this.setState({ location:res.data[0] });
    
    console.log(API);
  }

  render() {
    return(
      <>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Location </Form.Label>
            <Form.Control placeholder="Enter City name:" onChange={(e) => this.setState({ searchQuery: e.target.value })} />
            <Button variant="secondary" onClick={this.getLocation}>Explore!</Button>
          </Form.Group>
          
        </Form>
        {this.state.location.place_id && 
          
          <h2>Latitude is {this.state.location.display_name}</h2>
        }
        {this.state.location.place_id && 
          
          <h2>Latitude is {this.state.location.lat}</h2>
        }
          {this.state.location.place_id && 
          
          <h2>Latitude is {this.state.location.lon}</h2>
          }
           
          
          <img src ={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${this.state.location.lat},${this.state.location.lon}&zoom=<zoom>`} alt={this.state.location.display_name}/>
          
      </>
    )
  }
}

export default App;
