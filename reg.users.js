const { registration } = require('./service/auth')

const { email, password } = process.env

try {
  registration({ email, password })
  console.log('Success')
} catch(error) {
  console.log(error.message)
}
