import React, {Component} from 'react'
import styled from 'react-emotion'
import Webcam from 'react-webcam'

import App from '../components/App'
import StandardButton from '../components/Button'
import ProfileCard from '../components/ProfileCard'

const webcamStyle = {
  width: '100%',
  height: '100%'
}

const Backdrop = styled.div`
  width: 100%;
  min-height: 100vh;
  background: url(https://kazzkiq.github.io/CodeFlask.js/img/bg-main_2x.png)
    #3d3a4e;
`

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  min-height: 100vh;
  max-width: 800px;
  margin: 0 auto;
  padding: 1.1em;
`

const Card = styled.div`
  width: 25em;
  background: white;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  position: relative;

  min-height: ${props => (props.long ? 40 : 10)}em;
`

const CardBody = styled.div`
  padding: 1.3em;
  color: #555;
  text-align: center;
`

const Button = styled(StandardButton)`
  width: 100%;
  margin-top: 1.8em;
`

@App
export default class ScannerView extends Component {
  state = {scanned: false}

  async componentDidMount() {}

  scan = () => {
    setTimeout(() => {
      this.setState({scanned: true})
    }, 2000)
  }

  render = () => (
    <Backdrop>
      <Container>
        {this.state.scanned ? (
          <Card long>
            <ProfileCard name="Chun Rapeepat" nickname="Chun" />
          </Card>
        ) : (
          <Card>
            <Webcam
              audio={false}
              style={webcamStyle}
              ref={webcam => (this.webcam = webcam)}
              screenshotFormat="image/jpeg"
            />
            <CardBody>
              Scanning...
              <Button color="#ff7657" onClick={this.scan}>
                Scan
              </Button>
            </CardBody>
          </Card>
        )}
      </Container>
    </Backdrop>
  )
}
