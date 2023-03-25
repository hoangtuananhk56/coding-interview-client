import { Input, Button } from 'antd';
import { Outlet, useNavigate } from "react-router-dom";
import CandidateWriting from '../../../components/candidate/CandidateWriting'
import RadioItem from '../../../components/testing/RadioItem'
import CheckboxItem from '../../../components/testing/CheckboxItem'
import Coding from '../../../components/candidate/Coding'
import './index.scss';

const CandidateTesting = () => {
  const navigate = useNavigate();
  const onHandleStart = () => {
    navigate('/welcome/challenges')
  }
  const value = 'coding'
  return (
   <div className='challenge-list-page'>
      <div className='challenge-list-page-left'>
        <div className='challenge-list-page-left-title'>
          1. SQL
        </div>
        <div className='challenge-list-page-left-content'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </div>
      </div>
      <div className='challenge-list-page-right'>
        {
          value === 'writing' &&  (
            <CandidateWriting />
          )
        }
        {
          value === 'radio' &&  (
            <RadioItem />
          )
        }
         {
          value === 'checkbox' &&  (
            <CheckboxItem />
          )
        }
        {
          value === 'coding' &&  (
            <Coding />
          )
        }
      <div className=''>

      </div>
      </div>
   </div>
  )
};

export default CandidateTesting;
