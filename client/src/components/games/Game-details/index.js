import React, { Component } from 'react'

import GameService from '../../../service/GameService'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom'



class GameDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            gameDetails: ""
        }
        this.gameService = new GameService()
        
    }

    componentDidMount = () => {

        const id = this.props.match.params.id
        this.gameService
            .getOneGame(id)
            .then(response => this.setState({ gameDetails: response.data }))
            .catch(err => console.log(err))


    }

    render() {


        return (
            <>

                <Container as="main">
                    <h1>{this.state.gameDetails.name}</h1>

                    <Row>
                        <Col md={{ span: 5, offset: 1 }}>

                            <p><b>Name:</b> {this.state.gameDetails.name_original}</p>
                            <hr></hr>
                            <p><b>Description:</b> {this.state.gameDetails.description_raw}</p>
                            <hr></hr>
                            <p><b>Metacritic Valoration:</b> {this.state.gameDetails.metacritic}</p>
                            <hr></hr>
                            <p><b>Release Date:</b> {this.state.gameDetails.released}</p>
                            <hr></hr>
                            <Link className="btn btn-dark btn-md" to='/games'>Back</Link>
                        </Col>
                        <Col md={{ span: 4, offset: 1 }}>
                            <img src={this.state.gameDetails.background_image} alt={this.state.gameDetails.name} />
                            <img src={this.state.gameDetails.background_image_additional} alt={this.state.gameDetails.name} />
                        </Col>
                    </Row>

                </Container>
            </>
        )
    }
}

export default GameDetails