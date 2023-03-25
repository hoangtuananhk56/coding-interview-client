import { Input, Button } from 'antd';
import { Outlet, useNavigate } from "react-router-dom";
import './challengelist.scss';

const challengelist = []
for (let i = 0; i < 5; i++) {
  challengelist.push({
    key: i,
    index: i + 1,
    title: 'Test' + i + 1,
  })
}

const Challengelist = () => {
  const navigate = useNavigate();
  const onHandleStart = () => {
    navigate('/welcome/challenges')
  }
  return (
    <div className='challenge-list-page'>
      {challengelist && challengelist.map(e => <Item index={e.index} title={e.title} />)}
    </div>
  )
};

const Item = ({ index, title }) => {
  console.log(index);
  return (
    <div className="challenge_item" key={index}>
      <div className='left-item'>
        <p className='item-key'>{index}.</p>
        <p className='item-title'>{title}</p>
      </div>
      <div className='right-item'>
        <Button prefixCls='start-btn'>START</Button>
      </div>
    </div>
  );
}

export default Challengelist;
