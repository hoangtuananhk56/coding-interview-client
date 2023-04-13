import { Button } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import challengeAPI from '../../../http/challengeAPI';
import examAPI from '../../../http/examAPI';
import './challengelist.scss';

const Challengelist = (props) => {
  const navigate = useNavigate();
  const { challengeid } = useParams();
  const [challenge, setChallenge] = useState();
  const [examList, setExamList] = useState([]);

  // useEffect(() => {
  //   console.log("BBB: ", challengeid);
  //   //Call challenge test to candidata
  //   challengeAPI.getbyId(challengeid).then(res => {
  //     setChallenge(res.data)
  //     if (res.data.examids.length !== 0) {
  //       res.data.examids.forEach(item => {
  //           examAPI.getbyId(item).then(res1 => {
  //               // debugger
  //               let arr = examList
  //               //Check exist item
  //               let index = arr.findIndex(e => {
  //                   return e._id === res1.data._id
  //               })

  //               if (index === -1) {
  //                   arr.push(res1.data)
  //                   setExamList(arr)
  //               }
  //           })
  //       })
  //   }
  //   }).catch(err => {
  //     console.log(err);
  //   })
  // }, [])

  const onHandleStart = (e) => {
    navigate('/candidates/challengelist/'+e)
  }

  if(!examList) {
    return <>Loading!</>
  }
  return (
    <div className='challenge-list-candidate'>
      {examList && examList.map((e, index) => <Item key={index} index={index} title={e.title} onHandleStart={() => onHandleStart(e._id)}/>)}
    </div>
  )
};

const Item = ({ index, title, onHandleStart, id }) => {
  return (
    <div className="challenge_item" key={index}>
      <div className='left-item'>
        <p className='item-key'>{index}.</p>
        <p className='item-title'>{title}</p>
      </div>
      <div className='right-item'>
        <Button prefixCls='start-btn' onClick={() => onHandleStart(id)}>START</Button>
      </div>
    </div>
  );
}

export default Challengelist;
