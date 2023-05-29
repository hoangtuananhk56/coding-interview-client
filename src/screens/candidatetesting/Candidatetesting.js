import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './candidatetesting.scss';
import logo from '../../assets/images/logo.png';
import challengeAPI from '../../http/challengeAPI';
import examSlice from '../../components/exam/examSlice'
import examAPI from '../../http/examAPI';
import challengeSlice from "../../components/challenge/challengeSlice";

const CandidateTesing = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { challengeid } = useParams();
  const { currentChallenge } = useSelector(state => state.challenge)
  const [examList, setExamList] = useState([]);

  useEffect(() => {
    // Call challenge test to candidata
    challengeAPI.getbyId(challengeid).then(res => {
      dispatch(challengeSlice.actions.currentChallengeChange(res.data))
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
  }, [])

  useEffect(() => {
    console.log("Hello");
    dispatch(examSlice.actions.examListChange(examList))
  }, [examList])

  const onHandleChang = (e) => {
    navigate('/candidates/'+challengeid+"/" + e)
  }
  if (!currentChallenge) {
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
          {currentChallenge.examids && currentChallenge.examids.map((e, index) => {
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

export default CandidateTesing;
