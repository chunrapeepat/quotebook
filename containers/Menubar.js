import React, {Component} from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import {connect} from 'react-redux'

import {
  userLogin,
  userLogout,
  userLoginWaiting,
  userLoginWithToken,
} from '../ducks/user'

import App from '../components/App'
import Button from '../components/Button'
import SignInLoading from '../components/SignInLoading'

import SignInModal from '../containers/SignInModal'
import PostQuoteModal from '../containers/PostQuoteModal'

import {Container, media, fonts, colors, fontSize} from '../core/styled'

const MenubarContainer = styled.div`
  padding: 7px 0;

  ${props => props.night ? `
    background: ${colors.main};
  ` : ``}
`

const Heading = styled.h1`
  margin: 0;
  left: 50%;
  cursor: pointer;
  position: relative;
  display: inline-block;
  transform: translateX(-50%);

  font-size: ${fontSize.giant};
  font-family: ${fonts.header};

  ${props => props.night ? `
    color: white;
  ` : ``}

  ${media.desktop`
    position: static;
    transform: translateX(0);
  `}
`

const SearchIcon = styled.div`
  position: absolute;
  cursor: pointer;
  left: 0;
  top: 0.5rem;

  font-size: ${fontSize.icon};

  ${props => props.night ? `
    & button {
      color: white;
      background: ${colors.main};
    }
  ` : ``}

  ${media.desktop`
    display: none;
  `}
`

const SearchIconMobile = styled.div`
  display: none;

  ${media.desktop`
    display: inline-block;
  `}
`

const RightContainer = styled.div`
  position: absolute;
  right: 0;
  top: 0.5rem;

  font-size: ${fontSize.icon};

  ${props => props.night ? `
    & button {
      color: white;
      background: ${colors.main};
    }
  ` : ``}

  ${media.desktop`
    right: 10px;
  `}

  ${media.tablet`
    display: none;
  `}
`

const MobileMenu = styled.div`
  display: none;
  margin-top: 7px;

  ${props => props.night ? `
    & button {
      color: white;
      background: ${colors.main};
    }
  ` : ``}

  ${media.tablet`
    display: block;
  `}
`

const ProfileImage = styled.img`
  width: 10px;
  height: 10px;
  transform: scale(2.5);
  border-radius: 50%;
`

const ProfileName = styled.span`
  margin-left: 15px;
`

class Menubar extends Component {
  state = {
    showSignInModal: false,
    postQuoteModal: false,
  }

  componentDidMount() {
    // if found code parameter
    const url = new URL(window.location.href)
    const fbCode = url.searchParams.get('code')
    // check state
    if (fbCode !== null) {
      this.props.userLogin(fbCode)
      this.props.userLoginWaiting()
    }
    // check token and auto login
    if (localStorage.getItem('token') != null && !this.props.user.isUserLogin) {
      this.props.userLoginWithToken()
      this.props.userLoginWaiting()
    }
  }

  render() {
    return (
      <MenubarContainer night={this.props.night}>

        {this.props.user.isWaiting &&
          <SignInLoading />
        }

        <SignInModal close={() => this.setState({
          showSignInModal: false,
        })} show={this.state.showSignInModal}/>

        <PostQuoteModal
          displayName={this.props.user.userProfile.display_name}
          profile={this.props.user.userProfile.profile_image}
          close={() => this.setState({
            postQuoteModal: false,
          })}
          show={this.state.postQuoteModal}/>

        <Container relative>

          <Link href="/">
            <Heading night={this.props.night}>QuoteBook</Heading>
          </Link>

          <SearchIcon night={this.props.night}>
            <Link href="/search">
              <Button inline icon><i className="zmdi zmdi-search"></i></Button>
            </Link>
          </SearchIcon>

          {!this.props.user.isUserLogin &&
            <RightContainer night={this.props.night}>
              <SearchIconMobile>
                <Link href="/search">
                  <Button inline icon><i className="zmdi zmdi-search"></i></Button>
                </Link>
              </SearchIconMobile>
              <Button inline onClick={() => this.setState({
                showSignInModal: true,
              })}>Sign In</Button>
              <Button inline regular onClick={() => this.setState({
                showSignInModal: true,
              })}>Post Your Own</Button>
            </RightContainer>
          }

          {this.props.user.isUserLogin &&
            <RightContainer night={this.props.night}>
              <SearchIconMobile>
                <Link href="/search">
                  <Button inline icon><i className="zmdi zmdi-search"></i></Button>
                </Link>
              </SearchIconMobile>
              <Link prefetch
                href={`/profile?id=${this.props.user.userProfile.fbid}`}
                as={`/profile/${this.props.user.userProfile.fbid}`}>
                <Button inline>Profile</Button>
              </Link>
              <Button onClick={this.props.userLogout} inline margin="0 10px 0 0">Logout</Button>
              <Button inline regular onClick={() => this.setState({
                postQuoteModal: true,
              })}>Post Your Own</Button>
            </RightContainer>
          }

          <MobileMenu night={this.props.night}>
            {!this.props.user.isUserLogin &&
              <div>
                <Link href="/search">
                  <Button inline>Search</Button>
                </Link>
                <Button inline onClick={() => this.setState({
                  showSignInModal: true,
                })}>Sign In</Button>
                <Button inline onClick={() => this.setState({
                  showSignInModal: true,
                })}>Post Your Own</Button>
              </div>
            }
            {this.props.user.isUserLogin &&
              <div>
                <Link href="/search">
                  <Button inline>Search</Button>
                </Link>
                <Link prefetch
                  href={`/profile?id=${this.props.user.userProfile.fbid}`}
                  as={`/profile/${this.props.user.userProfile.fbid}`}>
                  <Button inline>Profile</Button>
                </Link>
                <Button onClick={this.props.userLogout} inline>Logout</Button>
                <Button inline onClick={() => this.setState({
                  postQuoteModal: true,
                })}>Post Your Own</Button>
              </div>
            }
          </MobileMenu>

        </Container>
      </MenubarContainer>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    userLogin: code => dispatch(userLogin(code)),
    userLogout: () => {
      dispatch(userLogout())
      dispatch(userLoginWaiting())
    },
    userLoginWaiting: () => dispatch(userLoginWaiting()),
    userLoginWithToken: () => dispatch(userLoginWithToken()),
  }
}

export default App(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menubar))
