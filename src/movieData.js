import React from "react";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
class movieData extends React.Component {
    render() {
        const {vids} = this.props;
        return(
            <>
            <Container>
                <Row>
                  <hr></hr>
                  <Col sm={4}><h3><u>Movie Title</u></h3><b>{vids.title}</b></Col>
                  <Col sm={4}><h3><u>Movie overview</u></h3>{vids.overview}</Col>
                  <Col sm={4}><h3><u>Movie Popularity</u></h3>{vids.popularity}</Col>
                  
                </Row>
              
            </Container>
          
          </>
        )

           
    }
}

export default movieData;