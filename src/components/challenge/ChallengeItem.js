import {
    EditOutlined, MailOutlined, DeleteOutlined
} from '@ant-design/icons';
import moment from 'moment';
import './challengeitem.scss';

const ChallengeItem = ({id, title, index, updatedAt,onEdit, onDelete}) => {
    return (
        <div className="item-component">
            <div className='left-item'>
                <p className='item-key'>{index + 1}.</p>
                <p className='item-title'>{title}</p>
                <p className='item-time'>{moment(updatedAt).format("YYYY-MM-DD")}</p>
            </div>
            <div className='right-item'>
                <EditOutlined className='item-icon' onClick={() => onEdit(id)}/>
                <MailOutlined className='item-icon'/>
                <DeleteOutlined className='item-icon' onClick={() => onDelete(id)}/>
            </div>
        </div>
    );
}

export default ChallengeItem;