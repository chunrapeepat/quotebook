const User = require('../models/User')

// newUserRegister
// add new user if fbid is not exist on database
exports.newUserRegister = profile => {
  const fbid = profile.id
  const name = profile.name
  const email = profile.email
  const profileImage = `https://graph.facebook.com/${fbid}/picture?type=large&width=720&height=720`
  // if user not registered, add user to database.
  return new Promise((resolve, reject) => {
    User.count({fbid}, (err, count) => {
      if (err) reject(err)
      if (count <= 0) {
        const newUser = new User({
          fbid,
          username: fbid,
          display_name: name,
          email,
          profile_image: profileImage,
        })
        newUser.save().then(() => {
          resolve(fbid)
          console.log(`new user registered `, fbid, name)
        })
      } else {
        resolve({fbid})
      }
    })
  })
}

// updateToken
// update user token by fbid (facebook id)
exports.updateToken = (fbid, token) => {
  return User.update({
    fbid,
  }, {
    $set: {
      token,
    },
  })
}

// getUserProfile
// get user profile by fbid (render on profile page)
exports.getUserProfile = fbid => {
  return User.findOne({fbid})
}

// updateBio
// update user profile bio by fbid (facebook id)
exports.updateBio = (fbid, bio) => {
  try {
    return User.update({fbid}, {
      $set: {bio},
    })
  } catch (e) {
    return e
  }
}
