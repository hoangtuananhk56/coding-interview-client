import {
    EditOutlined, MailOutlined, DeleteOutlined
} from '@ant-design/icons';
import './examitem.scss';

const TestingItem = ({id, title, isEdit, isEmail, isDelete}) => {
    console.log(id, title)
    return (
        <div className="item-component" key={id}>
            <div className='left-item'>
                <p className='item-key'>{id}</p>
                <p className='item-title'>{title}</p>
            </div>
            <div className='right-item'>
                {isEdit && <EditOutlined className='item-icon'/>}
                {isEmail && <MailOutlined className='item-icon'/>}
                {isDelete && <DeleteOutlined className='item-icon'/>}
            </div>
        </div>
    );
}

export default TestingItem;