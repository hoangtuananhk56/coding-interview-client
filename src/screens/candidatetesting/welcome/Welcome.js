import { Input, Button } from 'antd';
import { useNavigate } from "react-router-dom";
import './welcome.scss'
import logo from '../../../assets/images/logo.png'

const Welcome = () => {
  const navigate = useNavigate();
  const onHandleStart = () => {
    navigate('/welcome/challenges')
  }
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
              <p>3 questions</p>
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
          <Input style={{width: 500}}/>
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
          <Button prefixCls='create-btn' onClick={onHandleStart()}>START</Button>
        </div>
      </div>
    </div>
  )
};

export default Welcome;
