import {
    EditOutlined, MailOutlined, CommentOutlined
} from '@ant-design/icons';
import './candidateitem.scss';

const CandidateItem = ({id, name, email,create_at,update_at, challenge, resolved, point, phone, onShowModalComment, onShowModalEmail}) => {
    return (
        <div className="candidate-item-component" key={id}>
            <div className='ids'>{id}</div>
            <div className='name'>{name}</div>
            <div className='email'>{email}</div>
            <div className='create_at'>{create_at}</div>
            <div className='update_at'>{update_at}</div>
            <div className='challenge'>{challenge}</div>
            <div className='resolved'>{resolved}</div>
            <div className='point'>{point}</div>
            <div className='phone'>{phone}</div>
            <div className='action'>
                <div className='icon'>
                    <CommentOutlined onClick={onShowModalComment}/>
                </div>
                <div className='icon'>
                    <MailOutlined onClick={onShowModalEmail}/>
                </div>
            </div>
        </div>
    );
}

export default CandidateItem;