import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import './candidatetesting.scss';
import logo from '../../assets/images/logo.png';
import challengeAPI from '../../http/challengeAPI';
import examAPI from '../../http/examAPI';


const CandidateTesing = () => {
  const navigate = useNavigate();
  const { challengeid } = useParams();
  const [challenge, setChallenge] = useState();
  const [examList, setExamList] = useState([]);

  useEffect(() => {
    //Call challenge test to candidata
    console.log("AAA: ", challengeid);
    challengeAPI.getbyId(challengeid).then(res => {
      setChallenge(res.data)
      // if (res.data.examids.length !== 0) {
      //   res.data.examids.forEach(item => {
      //     examAPI.getbyId(item).then(res1 => {
      //       // debugger
      //       let arr = examList
      //       //Check exist item
      //       // let index = arr.findIndex(e => {
      //       //   return e._id === res1.data._id
      //       // })

      //       // if (index === -1) {
      //         arr.push(res1.data)
      //         setExamList(arr)
      //       // }
      //     })
      //   })
      // }
    }).catch(err => {
      console.log(err);
    })
  }, [challengeid])

  const onHandleChang = (e) => {
    // navigate(e)
  }
  if (!challenge) {
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
          {challenge.examids && challenge.examids.map((e, index) => {
            return (
              <div key={index} className='challenge-list-page-menu-bar-item' onClick={() => onHandleChang(e)}>
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
