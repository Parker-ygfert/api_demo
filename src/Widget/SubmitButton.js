import '../styles/widget/submit_button.sass'

const SubmitButton = props => {
  return (
    <button type="submit" className="submit-button" onClick={props.submit}>
      Sign up
    </button>
  )
}

export default SubmitButton
