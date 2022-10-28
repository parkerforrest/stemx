import { Link } from 'react-router-dom'

const StudentCard = ({ smoothie }) => {
  return (
    <div className="student-card">
      <h3>{smoothie.title}</h3>
      <p>{smoothie.method}</p>
      <div>{smoothie.rating}</div>
      <div className="buttons">
        <Link to={'/' + smoothie.id}>
          <i className="material-icons">edit</i>
        </Link>
      </div>
    </div>
  )
}

export default StudentCard
