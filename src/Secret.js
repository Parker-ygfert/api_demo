import CryptoJS from 'crypto-js'
import JWT from 'expo-jwt'

const Secret = (props) => {
  const passwordSecret = process.env.REACT_APP_PASSWORD_SECRET
  const encryptedPassword = `${[...props.password].reverse().join('')}${passwordSecret}`
  const encryptedPasswordConfirmation = `${[...props.passwordConfirmation].reverse().join('')}${passwordSecret}`
  const payload = {
    email: props.email,
    password: encryptedPassword,
    password_confirmation: encryptedPasswordConfirmation,
    exp: Date.now()
  }
  let token = JWT.encode(payload, process.env.REACT_APP_JWT_SECRET, { algorithm: 'HS512' })
  token = CryptoJS.enc.Utf8.parse(token)
  token = CryptoJS.enc.Base64.stringify(token)
  return token
}
 
export default Secret
