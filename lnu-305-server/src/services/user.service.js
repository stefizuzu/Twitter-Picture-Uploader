const User = require('../database/user')
const Role = require('../database/role')

module.exports = {
  getUser,
  upsertUser
}

async function getUser (email) {
  const user = await User.getUser(email)

  return user
}

async function upsertUser (username, email, photoURL, roleName) {
  const existingUser = await User.getUser(email)

  if (existingUser) {
    return existingUser
  } else {
    const role = await Role.getRole('poweruser')

    const newUser = await User.createUser(username, email, photoURL, role.roleID)

    return newUser
  }
}
