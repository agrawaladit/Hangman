import React, { Component } from 'react';
import './Hangman.css';
import { randomQuestion } from './Questions.js';

import step0 from "./images/0.jpg";
import step1 from "./images/1.jpg";
import step2 from "./images/2.jpg";
import step3 from "./images/3.jpg";
import step4 from "./images/4.jpg";
import step5 from "./images/5.jpg";
import step6 from "./images/6.jpg";
import PropTypes from 'prop-types'
import { Container, Grid, Header, Menu, Icon, Dropdown, Button, Form, Segment, Placeholder, Card } from 'semantic-ui-react'


const HomepageHeading = ({ mobile }) => (
  <Container text>
    <Header
      as='h1'
      content='Hangman'
      inverted
      style={{
        fontSize: mobile ? '2em' : '4em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: mobile ? '1.5em' : '3em',
      }}
    />
    <Header
      as='h2'
      content='Can you save the man?'
      inverted
      style={{
        fontSize: mobile ? '1.5em' : '1.7em',
        fontWeight: 'normal',
        marginTop: mobile ? '0.5em' : '1.5em',
      }}
    />

  </Container>
)

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
}

class Hangman extends Component {
  static defaultProps = {
    maxWrong: 6,
    images: [step0, step1, step2, step3, step4, step5, step6],
    mode: 'home'
  }

  constructor(props) {
    super(props);
    this.state = {
      mistake: 0,
      guessed: new Set([]),
      answer: 'aa',
      question: 'aa',
      difficulty: 'Easy',
      name: ''
    }
  }

  componentDidMount() {
    var num = Math.floor(Math.random() * 5)
    this.setState({
      ...this.state,
      question: Object.values(randomQuestion(this.state.difficulty,num))[0],
      answer: Object.keys(randomQuestion(this.state.difficulty,num))[0],
    })
  }
  

  handleGuess = e => {
    let letter = e.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(letter),
      mistake: st.mistake + (st.answer.includes(letter) ? 0 : 1)
    }));
  }

  guessedWord() {
    return this.state.answer.split("").map(letter => (this.state.guessed.has(letter) ? letter : " _ "));
  }

  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(letter => (
      <button
        class='btn btn-lg btn-primary m-2'
        key={letter}
        value={letter}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(letter)}
      >
        {letter}
      </button>
    ));
  }

  resetButton = () => {
      var num = Math.floor(Math.random() * 5)
      this.setState({
        ...this.state,
        question: Object.values(randomQuestion(this.state.difficulty,num))[0],
        answer: Object.keys(randomQuestion(this.state.difficulty,num))[0],
        mistake: 0,
        guessed: new Set([]),
      })
  }

  homeButton = () => {
    var num = Math.floor(Math.random() * 5)
    this.setState({
      ...this.state,
      question: Object.values(randomQuestion(this.state.difficulty,num))[0],
      answer: Object.keys(randomQuestion(this.state.difficulty,num))[0],
      mistake: 0,
      guessed: new Set([]),
      mode: 'Home'
    })
}


  render() {
    console.log(this.state.question);
    
    const gameOver = this.state.mistake >= this.props.maxWrong;
    const isWinner = this.guessedWord().join("") === this.state.answer;
    let gameStat = this.generateButtons();

    const options = [
      { key: 1, text: 'High', value: 'High' },
      { key: 2, text: 'Easy', value: 'Easy' },
    ]

    
    if (isWinner) {
      gameStat = <Header as='h2' color='green'>You Won!</Header>
    }

    if (gameOver) {
      gameStat = <Header as='h2' color='red'>You Lose!</Header>
    }

    const contentPage = this.state.mode === 'game' ? (
      <div className="Hangman container">
        <Header as='h3' textAlign='center'>Hi {this.state.name}!</Header>
        <div className="float-right">Wrong Guesses: {this.state.mistake} of {this.props.maxWrong}</div>
        <Container textAlign='center'>
          <img src={this.props.images[this.state.mistake]} alt="" />
        </Container>
        <br></br>
        <div className="text-center">
          <Card fluid>
            <Card.Content style={{ backgroundColor: '#b1b1b1' }}>
              <Header as='h5'>{this.state.question}</Header>
            </Card.Content>
            <Card.Content>

              <Header as='h5'>{!gameOver ? this.guessedWord() : this.state.answer}</Header>
            </Card.Content>
          </Card>
          <p>{gameStat}</p>
          <button className='btn btn-info' onClick={this.resetButton} style={{marginRight:'10px'}}>Reset</button>
          <button className='btn btn-info' onClick={this.homeButton}>Home</button>
        </div>
      </div>
    ) : (
        <div className='text-center'>
          <Segment inverted textAlign='center' style={{ width: '100%', height: '100%' }}>
            <HomepageHeading></HomepageHeading>
          </Segment>

          <Form style={{ margin: '20px' }} textAlign='center'>
            <Form.Group widths='equal'>
              <Form.Input fluid label='Name' placeholder='Name' textAlign='center' onChange={(e, v) => this.setState({...this.state,name: v.value})} />
              <Form.Select
                fluid
                label='Difficulty'
                options={options}
                placeholder='Difficulty'
                textAlign='center'
                onChange={(e, v) => {
                  var num = Math.floor(Math.random() * 5)
                  this.setState({...this.state,difficulty: v.value,question: Object.values(randomQuestion(v.value,num))[0],answer: Object.keys(randomQuestion(v.value,num))[0]})
                  }}
              />
            </Form.Group>
          </Form>
          <Button primary size='huge' onClick={() => this.setState({ ...this.state, mode: 'game' })}>
            Get Started
                    <Icon name='right arrow' />
          </Button>
        </div>
      )

    
    return (
      <div>
        {contentPage}
      </div>
    )
  }
}

export default Hangman;