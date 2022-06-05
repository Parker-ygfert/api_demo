import Axios from '../Axios'
import Input from '../Widget/Input'
import LoadingButton from '../Widget/LoadingButton'
import Secret from '../Secret'
import SubmitButton from '../Widget/SubmitButton'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/sign_up.sass'

const SignUp = () => {
  const [submit, setSubmit] = useState(false)
  const [emailError, setEmailError] = useState(null)
  const [passwordError, setPasswordError] = useState(null)
  const [passwordConfirm, setPasswordConfirm] = useState(null)
  const [auth, setAuth] = useState({})
  const inputElement = useRef(null)
  const googleAuth = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (inputElement.current) {
      inputElement.current.focus()
    }
  }, [])

  useEffect(() => {
    if (submit) {
      Axios.post('/api/users', { user: auth })
        .then(res => {
          const data = res.data
          if (data.errors) {
            for (let message of data.message) {
              const name = Object.keys(message)[0]
              eval(`set${name[0].toUpperCase() + name.substring(1)}Error('${name} ${message[name]}')`)
              setSubmit(false)
            }
          } else {
            navigate('/')
          }
        })
        .catch(err => {
          alert(err.message)
          setSubmit(false)
        })
    }
  }, [submit])

  const hoverGoogle = isHover => {
    const img = isHover ? 'pressed' : 'normal'
    googleAuth.current.setAttribute(
      'src',
      require(`../assets/btn_google_signin_dark_${img}_web@2x.png`)
    )
  }

  const handleInvalid = (input, isValid) => {
    if (isValid) {
      input.classList.remove('invalid')
    } else {
      input.classList.add('invalid')
      input.focus()
    }
  }

  const verifyEmail = form => {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    const email = form.email
    const isValid = email.value.match(emailRegex) !== null
    handleInvalid(email, isValid)
    isValid ? setEmailError(null) : setEmailError('Invalid email')
    return isValid
  }

  const verifyPassword = form => {
    const password = form.password
    const isValid = password.value.length >= 6
    handleInvalid(password, isValid)
    isValid ? setPasswordError(null) : setPasswordError('Password is too short')
    return isValid
  }

  const verifyPasswordConfirmation = form => {
    const passwordConfirmation = form.passwordConfirmation
    const isValid = form.password.value === passwordConfirmation.value
    handleInvalid(passwordConfirmation, isValid)
    isValid ? setPasswordConfirm(null) : setPasswordConfirm('Password is inconsistent')
    return isValid
  }

  const handleSubmit = event => {
    event.preventDefault()
    const form = event.currentTarget.form
    if (
      verifyEmail(form) &&
      verifyPassword(form) &&
      verifyPasswordConfirmation(form)
    ) {
      setSubmit(true)
      setAuth(
        Secret({
          email: form.email.value,
          password: form.password.value,
          passwordConfirmation: form.passwordConfirmation.value,
        })
      )
    }
  }

  return (
    <section className="sign-up">
      <div className="container">
        <div className="box">
          <div className="image">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              alt="Phone"
            />
          </div>
          <div className="form">
            <form>
              <div className="form-group">
                <Input
                  type={'email'}
                  name={'email'}
                  placeholder={'Email address'}
                  autoComplete={'on'}
                  autoFocus={'on'}
                  required={'required'}
                  errorMessage={emailError}
                />
              </div>
              <div className="form-group">
                <Input
                  type={'password'}
                  name={'password'}
                  placeholder={'Password'}
                  required={'required'}
                  errorMessage={passwordError}
                />
              </div>
              <div className="form-group">
                <Input
                  type={'password'}
                  name={'passwordConfirmation'}
                  placeholder={'Password Confirmation'}
                  required={'required'}
                  errorMessage={passwordConfirm}
                />
              </div>
              {submit ? (
                <LoadingButton />
              ) : (
                <SubmitButton submit={handleSubmit} />
              )}
            </form>
            <div className="divide">
              <p>OR</p>
            </div>
            <button
              className="auth"
              onMouseOver={() => {
                hoverGoogle(true)
              }}
              onMouseOut={() => {
                hoverGoogle(false)
              }}
            >
              <img
                src={require('../assets/btn_google_signin_dark_normal_web@2x.png')}
                alt=""
                ref={googleAuth}
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SignUp
