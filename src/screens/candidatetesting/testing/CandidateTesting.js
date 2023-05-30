import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import CandidateWriting from '../../../components/candidate/CandidateWriting';
import Coding from '../../../components/candidate/Coding';
import CheckboxItem from '../../../components/testing/CheckboxItem';
import RadioItem from '../../../components/testing/RadioItem';
import './index.scss';
import examAPI from '../../../http/examAPI';
import codeData from "../../../config/codeData";

const CandidateTesting = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const value = 'radio'
  const [currentExam, setCurrentExam] = useState();
  const [coding, setCoding] = useState({
    language: 'go',
    code: codeData.Golang,
    examid: id,
    email: localStorage.getItem('email')
  });
  const [result, setResult] = useState([])

  useEffect(() => {
    examAPI.getbyId(id).then(res => {
      setCurrentExam(res.data)
    })
  }, [id])

  useEffect(() => {
    onLanguage(coding.language)
  }, [coding.language])
  const onLanguage = (language) => {
    switch (language) {
      case 'java':
        setCoding({...coding, code: codeData.Java})
        break
      case 'cpp':
        setCoding({...coding, code: codeData.Cpp})
        break
      case 'c':
        setCoding({...coding, code: codeData.C})
        break
      case 'cs':
        setCoding({...coding, code: codeData.CShape})
        break
      case 'py':
        setCoding({...coding, code: codeData.Python})
        break
      case 'js':
        setCoding({...coding, code: codeData.JS})
        break
      case 'go':
        setCoding({...coding, code: codeData.Golang})
        break
      default:
        setCoding({...coding, code: codeData.Golang})
        break
    }
  }
  const onRunCode = () => {
    //Call API code running but not update result
    examAPI.runCode(coding).then(res => {
      console.log(res.data);
    })
  }

  const onSubmit = () => {
    switch (currentExam.type) {
      case 'coding':
        //Call API check code but not update result
        break;
      case 'writing':
        //Call API Submit
        break;
      case 'radio':

        break;
      case 'checkbox':

        break;

      default:
        break;
    }
  }

  if (!currentExam) {
    return (
      <>Loading!</>
    )
  }
  return (
    <div className='challenge-list-page'>
      <div className='challenge-list-page-left'>
        <div className='challenge-list-page-left-title'>
          {currentExam.challenge_type} - {currentExam.title}
        </div>
        <div className='challenge-list-page-left-content'>
          {currentExam.content}
        </div>
        <div className='challenge-list-page-left-content'>
          {
            currentExam && currentExam.type === 'coding' && (
              <div>
                <TestCase input={currentExam.coding.input} output={currentExam.coding.output} />
                <br />
                TESTCASE:
                <br />
                <TestCaseAList testcase={currentExam.coding.testcase} />
              </div>
            )
          }
        </div>
      </div>
      <div className='challenge-list-page-right'>
        {
          currentExam.type === 'writing' && (
            <CandidateWriting />
          )
        }
        {
          value === 'radio' && (
            <RadioItem />
          )
        }
        {
          currentExam.type === 'checkbox' && (
            <CheckboxItem />
          )
        }
        {
          currentExam.type === 'coding' && (
            <Coding coding={coding} setCoding={setCoding} onRunCode={onRunCode} onSubmit={onSubmit} />
          )
        }
        <div className=''>

        </div>
      </div>
    </div>
  )
};

const TestCase = ({ input, output }) => {
  return (
    <>
      <p>
        Input: {input}
      </p>
      <p>
        Output: {output}
      </p>
    </>
  )
}

const TestCaseAList = ({ testcase }) => {
  return (
    testcase.map((e, index) => (
      <TestCase key={index} input={e.input} output={e.output} />
    ))
  )
}
export default CandidateTesting;

