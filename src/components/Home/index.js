import {Component} from 'react'

import Header from '../Header'

import './index.css'

class Home extends Component {
  state = {upload: [], showUploadedData: false}

  onSubmitForm = async e => {
    e.preventDefault()

    const {upload} = this.state

    // const testData = [
    //   {
    //     userId: '9999',
    //     id: '99999',
    //     title: 'sri',
    //     body: 'sri kanaka durga',
    //   },
    // ]

    const url = 'https://financepeerassignment.herokuapp.com/upload'

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/JSON',
        'access-control-allow-origin': '*',
      },
      body: JSON.stringify(upload),
    }

    try {
      const response = await fetch(url, options)
      const data = await response.json()

      this.setState({showUploadedData: true})
    } catch {
      console.log('Error')
    }

    // if (response.ok) {
    //   console.log(data)
    // } else {
    //   console.log('Error')
    // }
  }

  logFile = event => {
    const str = event.target.result

    const json = JSON.parse(str)
    console.log(json)

    this.setState({upload: json})
  }

  handleSubmit = event => {
    event.preventDefault()

    const reader = new FileReader()

    reader.onload = this.logFile

    reader.readAsText(event.target.files[0])
  }

  changeOnUpload = e => {
    this.handleSubmit(e)
  }

  viewProducts = () => {
    const {history} = this.props
    this.setState({showUploadedData: false})

    history.replace('/products')
  }

  renderUploadedCard = () => (
    <div className="success-container">
      <p className="Success-msg">Uploaded Successfully</p>

      <button type="submit" className="trans-btn" onClick={this.viewProducts}>
        View Products
      </button>
    </div>
  )

  render() {
    const {showUploadedData} = this.state

    return (
      <>
        <Header />
        <form
          method="post"
          action="#"
          id="#"
          onSubmit={this.onSubmitForm}
          className="form-control form-ele"
        >
          <div className="form-group files">
            <label htmlFor="upload" className="uploadText">
              Upload Your File{' '}
            </label>
            <input
              type="file"
              className="form-control"
              multiple=""
              name="upload"
              onChange={this.changeOnUpload}
            />
          </div>
          <div className="btn-container">
            <button type="submit" className="btn btn-primary pt2 mt-3 cst-btn">
              Submit
            </button>
          </div>
        </form>

        <div className="successContainer">
          {showUploadedData && this.renderUploadedCard()}
        </div>
      </>
    )
  }
}

export default Home
