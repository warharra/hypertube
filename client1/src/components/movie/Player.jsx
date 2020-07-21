import React, { useState, Fragment, useEffect } from 'react'
import {
  Container,
  Row,
  Col,
  Form,
  Image,
  Button,
  Badge,
} from 'react-bootstrap'
import YouTube from '@u-wave/react-youtube'
// import { useParams, Redirect } from 'react-router-dom'
import './Movie.css'
import './Player.css'
import NavbarHeader from '../navbar/Navbar'
import { useParams, Redirect } from 'react-router-dom'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { sendComment, getComment } from '../../api/films'
// import CustomSpinner from '../auth/Spinner'

import { notificationAlert } from '../functions/notification'

const withData = (data) => {
  return {
    error: false,
    data,
  }
}
const fetchMovie = async (url, id) => {
  try {
    let { data: res } = await axios.get(url + id)

    return withData(res.data.movie)
  } catch (err) {
    console.log(err)

    return {
      message: 'Opps! Something went wrong while fetching the data',
    }
  }
}

const Player = () => {
  const urlMovie = `https://yts.mx/api/v2/movie_details.json?movie_id=`
  const urlInfo = `https://yts.mx/api/v2/movie_details.json?movie_id=`
  const [movies, setMovies] = useState([])
  const [comment, setComment] = useState('')
  const [tabComment, setTabComment] = useState([])

  let { id } = useParams()
  useEffect(() => {
    ;(async () => {
      const { data, error } = await fetchMovie(urlMovie, id)
      if (error) {
        console.log(error)
        return
      }
      setMovies({ ...movies, ...data })
    })()
  }, [id])

  useEffect(() => {
    getComment(id)
      .then((data) => {
        if (data.err) {
          notificationAlert(data.err, 'danger', 'bottom-center')
        } else {
          setTabComment(data)
        }
      })
      .catch((err) => console.log(err))
  }, [])

  const handlechange = (event) => {
    setComment([event.target.value])
  }

  const handleSendComment = () => {
    sendComment({
      movie_id: movies.id,
      comment: comment,
    })
      .then((data) => {
        notificationAlert(data.msg, 'success', 'bottom-center')
        setComment('')
      })
      .catch((err) => console.log(err))
  }

  return (
    <Fragment>
      <NavbarHeader />
      <Container className="my-3">
        <Row>
          <Col md={4} className="mt-5 ">
            <Row>
              <Col>
                <Row
                  className="row-pictureProfile mt-4 py-5"
                  style={{ justifyContent: 'center' }}
                >
                  <div className="profile-header-container">
                    <Image src={movies.medium_cover_image} alt={id} />
                  </div>
                </Row>
                <Row
                  className="Row mt-4 py-3"
                  style={{
                    justifyContent: 'space-around',
                    flexWrap: 'wrap',
                    padding: '0 10%',
                    fontSize: '35px',
                  }}
                >
                  <span className="label label-default rank-label">
                    {movies.rating}
                    <FontAwesomeIcon
                      icon={faStar}
                      className="ml-2 popularity-icon"
                    />
                    {/* ☆☆☆☆☆ / {movies.rating} */}
                  </span>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col md={8} className="pl-5 mt-5">
            <Row className="mb-4 pt-3 pb-4 mt-4 Row">
              <Col>
                <h2>{movies.title_long}</h2>
                {/* <p> Date de sortie : 24/01/2020 Au cinéma (02h30)</p> */}
                <p>Titre original : {movies.title} </p>
                {/* <p>Réalisé par : Remo D'Souza </p> */}
                <p>Acteurs : Shraddha Kapoor, Varun Dhawan, Prabhu Deva.</p>
                <p>Genre : {movies.genres}</p>
                <p>Synopsis : {movies.description_intro}</p>
              </Col>
            </Row>
            <Row className="mb-5 pb-5 mt-2">
              <Col>
                <YouTube className="film" video="ISGBUaojwfs" autoplay />
              </Col>
            </Row>
            <Row className="mb-4 pt-5 pb-4 mt-5 ">
              <Col className=" pl-1">
                <Form>
                  <div className="form-group" style={{ marginTop: '5%' }}>
                    <textarea
                      onChange={handlechange}
                      value={comment}
                      placeholder="Add a comment..."
                      className="form-control"
                      id="exampleFormControlTextarea1"
                      rows="3"
                    ></textarea>
                    <Button
                      onClick={handleSendComment}
                      className="text-uppercase mx-4 mb-4"
                      variant="outline-secondary"
                      className="float-right"
                      style={{ letterSpacing: '1px', fontWeight: 'bold' }}
                    >
                      Valider
                    </Button>
                  </div>
                  <div className="Row">
                    {tabComment.map((comment, i) => {
                      return (
                        <div key={i}>
                          <Badge key={i} className="comments mr-2 pl-2 mt-2">
                            {comment.userName}
                          </Badge>
                          {comment.comment}
                        </div>
                      )
                    })}
                  </div>
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </Fragment>
  )
}

export default Player
