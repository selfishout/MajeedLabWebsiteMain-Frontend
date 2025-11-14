import './ProfessorInfo.css'
import { teamData } from '../../data/teamData'

function ProfessorInfo() {
  const professor = teamData.professor

  if (!professor) {
    return null
  }

  return (
    <div className="professor-section" id="professor-info">
      <h2>Lab Leadership</h2>
      <div className="professor-container">
        <div className="professor-image-wrapper">
          <img src={professor.image} alt={professor.name} className="professor-image" />
        </div>
        <div className="professor-details">
          <p><strong>Name:</strong> {professor.name}</p>
          <p><strong>Designation:</strong> {professor.designation}</p>
          <p><strong>Email:</strong> <a href={`mailto:${professor.email}`}>{professor.email}</a></p>
          {professor.affiliation && (
            <p><strong>Affiliation:</strong> {professor.affiliation}</p>
          )}
          {professor.research_interests && (
            <p><strong>Research Focus:</strong> {professor.research_interests}</p>
          )}
          {professor.bio && (
            <p><strong>Overview:</strong> {professor.bio}</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfessorInfo
