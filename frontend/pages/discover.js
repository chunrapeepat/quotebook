import React, {Component} from 'react'

import App from '../components/App'
import Navbar from '../components/Navbar'
import CardSlider from '../components/CardSlider'

// Flow 2.1
// (Gather People with Same Interest)

// Discover and Invite People to Gang
//   Card Slider: Slide to change people
//   Measure: Lists of People you have invited to gang
//   Action: Invite People
//   Shown according to location (nearest first + interests)

@App
export default class extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <CardSlider name="Rapeepat Kaewprasit" nickname="Chun" />
      </div>
    )
  }
}
