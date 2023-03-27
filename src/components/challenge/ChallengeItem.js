import {
    EditOutlined, MailOutlined, DeleteOutlined
} from '@ant-design/icons';
import './challengeitem.scss';

const ChallengeItem = ({id, title, index, updateAt}) => {
    console.log(id, title)
    return (
        <div className="item-component" key={id}>
            <div className='left-item'>
                <p className='item-key'>{index + 1}.</p>
                <p className='item-title'>{title}</p>
            </div>
            <div className='right-item'>
                <EditOutlined className='item-icon'/>
                <MailOutlined className='item-icon'/>
                <DeleteOutlined className='item-icon'/>
            </div>
        </div>
    );
}

export default ChallengeItem;