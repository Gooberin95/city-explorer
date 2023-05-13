import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      location: {},
      gift: []

    }
  }

  getLocation = async () => {
    const API = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.searchQuery}&format=json`;

    const res = await axios.get(API);
    console.log(res.data);
    this.setState({ location: res.data[0] });

    console.log(`${this.state.location}`);
    this.getForecast();
  }

  getForecast = async () => {
    try {
      const url = `${process.env.REACT_APP_SERVER}/weather?lat=${this.state.location.lat}&lon=${this.state.location.lon}`;
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
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                  <Card.Title>{item.date}</Card.Title>
                  <Card.Text>
                    {item.temp}
                  </Card.Text>
                    {item.description}
                  
                </Card.Body>
              </Card>
              <p>{item.name}</p>
              <p>{item.description}</p>
            </>
          )
        }
      </>
    )
  }
}

export default App;
