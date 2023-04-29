import axios from 'axios'

const Testing = () => {
  axios.get('http://127.0.0.1:8000/purchases/')
    .then(function (response) {
      if (response) {
        console.log(response)
      }
    })

  return (
    <div>testing</div>
  )
}

export default Testing
