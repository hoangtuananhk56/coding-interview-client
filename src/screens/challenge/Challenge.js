import { useNavigate } from "react-router-dom";
import './challenge.scss';
const Challenge = () => {
  return (
    <div className="home">
      <div className='row'>
        <Card title={"SQL"} tolink={"sql"}/>
        <Card title={"Algorithm"} tolink={"algorithm"}/>
        <Card title={"Knowledge"} tolink={"knowledge"}/>
      </div>
    </div>
  );
};

const Card = ({title, tolink}) => {
  const navigate = useNavigate();
  return (
    <>
      <div className='challenge-card' onClick={() => navigate(tolink)}>
        {title}
      </div>
    </>
  )
}
export default Challenge;