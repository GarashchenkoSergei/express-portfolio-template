const bcrypt = require('bcrypt')
const db = require('../../db')

const registration = (data) => {
  try {
    const { email, password } = data
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    db.get('users').push({
      email,
      hash
    }).write()
  } catch (error) {
    throw new Error('Something wrond during the user registration')
  }
}

const authorization = (data) => {
  const { email, password } = data
  const user = db.get('users').find({ email }).value()

  if (!user || 
      !bcrypt.compareSync(password, user.hash)
  ) throw new Error('Wrong user/password pair')
}

module.exports = {
  registration,
  authorization
}