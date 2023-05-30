import { Input, Button } from 'antd';
import { useNavigate, useParams} from "react-router-dom";
import './welcome.scss'
import logo from '../../../assets/images/logo.png'
import { useEffect, useState } from 'react';
import challengeAPI from '../../../http/challengeAPI';

const Welcome = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [challenge, setChallenge] = useState();
  const onHandleStart = () => {
    navigate('/candidates')
  }

  useEffect(() => {
    //Call challenge test to candidata
    challengeAPI.getbyId(id).then(res => {
      setChallenge(res.data)
    }).catch(err => {
      console.log(err);
    })
  }, [id])
  if (!challenge) return (
    <>Loading!</>
);
  return (
    <div className="welcome-page">
      <div className="welcome-page-left">
        <div className="welcome-header">
          <img src={logo} alt="logo" style={{ height: 40 }} />
        </div>
        <div className="welcome-page-left-body">
          <div className="welcome-page-left-body-title">
            WELCOME TO BFAST TEST
          </div>
          <div className="welcome-page-left-body-content">
            <div className="welcome-page-left-body-content-item">
              <p>Test duration</p>
              <p>180 mins</p>
            </div>
            <div className="welcome-page-left-body-content-item">
              <p>No. questions</p>
              <p>{challenge.examids.length} questions</p>
            </div>
          </div>
        </div>
      </div>
      <div className="welcome-page-right">
        <div className="welcome-header" style={{marginLeft: '9%'}}>
          WELCOME TO BFAST TEST
        </div>
        <div className="welcome-page-right-body">
          <div className="welcome-page-right-title">
            Confirmmation Form
          </div>
          <div className="welcome-page-right-text">
            Before we start, here is some extra information we need to assess you better.
          </div>
          <div className="welcome-page-right-text">
            Email address/Login
          </div>
          <Input style={{width: 500}} onChange={(e) => localStorage.setItem('email',e.target.value)}/>
          <div className="welcome-page-right-text">
            Declaration Statement
          </div>
          <div className="welcome-page-right-text row" style={{fontSize: 14}}>
            <input type='checkbox' style={{marginRight: 10}}/>
            I agree not to copy code from any source, including websites, books, or colleagues. I may refer to language documentation or an IDE of my choice. I agree not to copy or share BFast’s copyrighted assessment content or questions on any website or forum.
          </div>
          <div className="welcome-page-right-text row" style={{fontSize: 14}}>
            <input type='checkbox' style={{marginRight: 10}}/>
            I agree to BFast's Terms of Service and Privacy policy.
          </div>
        </div>
        <div className='welcome-start-btn'>
          <Button prefixCls='create-btn' onClick={onHandleStart}>START</Button>
        </div>
      </div>
    </div>
  )
};

export default Welcome;
