import './index.css'

const Card = props => {
  const {each} = props
  const {title, body} = each

  return (
    <li className="team-item">
      <div className="link">
        <h1 className="headingEle">{title}</h1>
        <p className="team-name">{body}</p>
      </div>
    </li>
  )
}

export default Card
