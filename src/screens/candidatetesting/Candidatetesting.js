import { Outlet, useNavigate } from "react-router-dom";
import './candidatetesting.scss'
import logo from '../../assets/images/logo.png'

const challengelist = []
for (let i = 0; i < 5; i++) {
  challengelist.push({
    key: i,
    index: i + 1,
    title: 'Test' + i + 1,
  })
}


const CandidateTesing = () => {
  const navigate = useNavigate();
  return (
    <div className="candidatetesting-page">
      <div className="candidatetesting-page-header">
        <img src={logo} alt="logo"/>
      </div>
      <div className="candidatetesting-page-body">
        <div className='candidatetesting-menu-bar'>
          {challengelist && challengelist.map(e => {
            return (
              <div className='challenge-list-page-menu-bar-item'>
                {e.index}
              </div>
            );
          })}
        </div>
          <Outlet />
      </div>
    </div>
  )
};

export default CandidateTesing;
