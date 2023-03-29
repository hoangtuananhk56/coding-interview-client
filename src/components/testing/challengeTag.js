import {Tag} from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import './index.scss'

const ChallengeTag = ({title, tag, id}) => {
    return (
        <div className="challenge-item">
            <div className="title">
                {title}
                <Tag color={"#FFCA28"} style={{marginLeft: 10}}>{tag}</Tag>
            </div>
            <div className='icon'>
                <DeleteOutlined className='item-icon'/>
            </div>
        </div>
    )
}

export default ChallengeTag;