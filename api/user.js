const User = require('../models/User')

// newUserRegister
// add new user if fbid is not exist on database
exports.newUserRegister = profile => {
  const fbid = profile.id
  const name = profile.name
  const email = profile.email
  const profileImage = `https://graph.facebook.com/${fbid}/picture?type=large&width=720&height=720`
  // if user not registered, add user to database.
  User.count({fbid}, (err, count) => {
    if (count <= 0) {
      const newUser = new User({
        fbid,
        username: fbid,
        display_name: name,
        email,
        profile_image: profileImage,
      })
      newUser.save().then(() => {
        console.log(`new user registered `, fbid, name)
      })
    }
  })
}

// updateToken
// update user token by fbid (facebook id)
exports.updateToken = (fbid, token) => {
  User.update({
    fbid,
  }, {
    $set: {
      token,
    },
  }).catch(err => {
    if (err) throw err
  })
}

// getUserProfile
// get user profile by fbid (render on profile page)
exports.getUserProfile = fbid => {
  try {
    return User.findOne({fbid})
  } catch(e) {
    return e
  }
}
