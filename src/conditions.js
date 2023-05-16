import React from "react"; 
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';


class Conditions extends React.Component {
    render () {
        const {con} = this.props;




        return (
      <>
        <Container>
          <Row>
            <Col sm={4}>{con.date}</Col>
            <Col sm={4}>{con.temp}</Col>
            <Col sm={4}>{con.description}</Col>
          </Row>
        
        </Container>
      
      </>

        )
        }
    }

export default Conditions;