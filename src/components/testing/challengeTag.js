import {Tag} from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import './index.scss'

const ChallengeTag = ({title, tag, id,onSelect, onDelete}) => {
    return (
        <div className="challenge-item">
            <div className="title" onClick={() => onSelect(id)}>
                {title}
                <Tag color={"#FFCA28"} style={{marginLeft: 10}}>{tag}</Tag>
            </div>
            <div className='icon'>
                <DeleteOutlined className='item-icon' onClick={() => onDelete(id)}/>
            </div>
        </div>
    )
}

export default ChallengeTag;