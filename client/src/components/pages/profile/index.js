import React, { Component } from 'react'
import ProfileService from '../../../service/ProfileService'
import GamesService from '../../../service/GameService'
import GameCard from './Game-card'
import AvatarForm from './Avatar-form'

// BOOTSTRAP COMPONENTS
import CommunityCard from './Community-card'
import EventCard from './Event-card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'


class Profile extends Component {
    constructor() {
        super()
        this.state = {
            allProfile: undefined,
            gameDetails: undefined,
            showModal: false


        }

        this.profileService = new ProfileService()
        this.gameService = new GamesService()
    }

    componentDidMount() {

        this.updateCommunityList()
        this.updateFavGames()

    }

    updateCommunityList = () => {

        this.profileService
            .getAllProfile(this.props.loggedInUser._id)
            .then(response => this.setState({ allProfile: response.data }))
            .catch(err => console.log(err))
    }

    updateFavGames = () => {

        let promise1 = this.gameService
            .getOneGame(this.props.loggedInUser.favGame[0])

        let promise2 = this.gameService
            .getOneGame(this.props.loggedInUser.favGame[1])

        let promise3 = this.gameService
            .getOneGame(this.props.loggedInUser.favGame[2])

        let promise4 = this.gameService
            .getOneGame(this.props.loggedInUser.favGame[3])

        let promise5 = this.gameService
            .getOneGame(this.props.loggedInUser.favGame[4])

        Promise.all([promise1, promise2, promise3, promise4, promise5]).then(response => this.setState({ gameDetails: response }, () => console.log(this.state.gameDetails)))
    }

    handleModal = (status) => {

        this.setState({ showModal: status })

    }

    handleAvatarSubmit = () => {
        this.handleModal(false)
        this.updateCommunityList()
    }




    render() {



        return (
            <>
                <Container>
                    <section>
                        <Button onClick={() => this.handleModal(true)} variant="dark" size="sm" style={{ marginBottom: '20px' }}>Upload new avatar</Button>

                        <Modal size="lg" show={this.state.showModal} onHide={() => this.handleModal(false)}>
                            <Modal.Body>
                                <AvatarForm handleAvatarSubmit={() => this.handleAvatarSubmit()} loggedInUser={this.props.loggedInUser} />
                            </Modal.Body>
                        </Modal>

                        <img src={this.props.loggedInUser.avatar} alt={this.props.loggedInUser.username} />



                        <h1>¡Hi, {this.props.loggedInUser.username}!</h1>
                        <article>

                            <h2>Favourite Community</h2>
                            <Row>
                                {this.state.allProfile && this.state.allProfile.favCommunity.map(elm => <CommunityCard key={elm._id} elm={elm} loggedInUser={this.props.loggedInUser.avatar} updateCommunityList={() => this.updateCommunityList} />)}
                            </Row>

                        </article>


                        <hr></hr>
                        <article>
                            <h2> Favourite Events</h2>
                            <Row>
                                {this.state.allProfile && this.state.allProfile.favEvent.map(elm => <EventCard key={elm._id} elm={elm} loggedInUser={this.props.loggedInUser} updateCommunityList={() => this.updateCommunityList} />)}
                            </Row>

                        </article>
                        <hr></hr>
                        <article>
                            <h2>Favourite Games</h2>
                            <Row>
                                {this.state.gameDetails && this.state.gameDetails.map(elm => <GameCard key={elm.data.id} elm={elm} loggedInUser={this.props.loggedInUser} updateFavGames={() => this.updateFavGames} />)}
                            </Row>
                        </article>

                    </section>


                </Container>

            </>
        )
    }
}

export default Profile
