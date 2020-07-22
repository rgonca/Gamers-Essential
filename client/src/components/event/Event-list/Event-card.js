import React from 'react'
import { Link } from 'react-router-dom'

// BOOTSTRAP COMPONENTS
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'


const EventCard = props => {

    return (
        <>

            <Col md={4}>
                <Card className="event-card">
                    <Card.Img variant="top" src={props.elm.imageEvent} />
                    <Card.Body>
                        <Card.Title>{props.elm.title}</Card.Title>
                        <Card.Text> {props.elm.genre} </Card.Text>
                        <Link to={`/events/${props.elm._id}`} className="btn btn-dark btn-block btn-sm">Details</Link><br></br>
                        <Button className="btn btn-dark btn-block btn-sm" onClick={() => props.handleModal(true, props.elm)} variant="dark" size="sm" style={{ marginBottom: '20px' }}>Edit</Button>
                        <Button className="btn btn-dark btn-block btn-sm" onClick={() => props.handleDelete( props.elm._id)} variant="dark" size="sm" style={{ marginBottom: '20px' }}>Delete</Button>
                    </Card.Body>
                </Card>

            </Col>
        </>
    )
}

export default EventCard