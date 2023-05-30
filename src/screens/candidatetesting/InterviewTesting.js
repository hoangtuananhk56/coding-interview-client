import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import './candidatetesting.scss';
import logo from '../../assets/images/logo.png';
import challengeAPI from '../../http/challengeAPI';
import examAPI from '../../http/examAPI';

const InterviewTesting = () => {
  const navigate = useNavigate();
  const { challengeid } = useParams();
  const [examList, setExamList] = useState([]);

  useEffect(() => {
    // Call challenge test to candidata
    challengeAPI.getbyId(challengeid).then(res => {
      // dispatch(challengeSlice.actions.currentChallengeChange(res.data))
      if (res.data.examids.length !== 0) {
        res.data.examids.forEach(item => {
          examAPI.getbyId(item).then(res1 => {
            //Check exist item
            let index = examList.findIndex(e => {
              return e._id === res1.data._id
            })

            if (index === -1) {
              setExamList([...examList, res1.data])
            }
          })
        })
      }
    }).catch(err => {
      console.log(err);
    })
  }, [challengeid])

  const onHandleChang = (e) => {
    navigate('/candidates/'+challengeid+"/" + e)
  }
  if (!examList) {
    return (
      <>Loading!</>
    )
  }
  return (
    <div className="candidatetesting-page">
      <div className="candidatetesting-page-header">
        <img src={logo} alt="logo" />
      </div>
      <div className="candidatetesting-page-body">
        <div className='candidatetesting-menu-bar'>
          {examList && examList.map((e, index) => {
            return (
              <div key={index} className='challenge-list-page-menu-bar-item' onClick={() => onHandleChang(e._id)}>
                {index}
              </div>
            );
          })}
        </div>
        <Outlet />
      </div>
    </div>
  )
};

export default InterviewTesting;
