import { Button } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import examAPI from '../../../http/examAPI';
import challengeAPI from '../../../http/challengeAPI';
import './challengelist.scss';

const Challengelist = (props) => {
  const navigate = useNavigate();
  const [examList, setExamList] = useState([]);
  const { challengeid } = useParams();

  useEffect(() => {
    challengeAPI.getbyId(challengeid).then(res => {
      var aa = examList
      if (res.data.examids.length !== 0) {
        res.data.examids.forEach(item => {
          examAPI.getbyId(item).then(res1 => {
            //Check exist item
            let index = aa.findIndex(e => {
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
  }, [challengeid, examList])

  const onHandleStart = (e) => {
    navigate('/candidates/'+challengeid+"/" + e)
  }

  if (!examList) {
    return (
      <>Loading!</>
    )
  }

  return (
    <div className='challenge-list-candidate'>
      {examList.map((e, index) => <Item key={index} index={index} title={e.title} onHandleStart={() => onHandleStart(e._id)} />)}
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
