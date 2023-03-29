import { CommentOutlined, MailOutlined } from '@ant-design/icons';
import moment from 'moment';
import './candidateitem.scss';

const CandidateItem = ({id,index, name, email,create_at,update_at, challenge, resolved, point, phone, onShowModalComment, onShowModalEmail}) => {
    return (
        <div className="candidate-item-component" key={id}>
            <div className='ids'>{index}</div>
            <div className='name'>{name}</div>
            <div className='email'>{email}</div>
            <div className='create_at'>{moment(create_at).format("YYYY-MM-DD")}</div>
            <div className='update_at'>{moment(update_at).format("YYYY-MM-DD")}</div>
            <div className='challenge'>{challenge}</div>
            <div className='resolved'>{resolved}</div>
            <div className='point'>{point}</div>
            <div className='phone'>{phone}</div>
            <div className='action'>
                <div className='icon'>
                    <CommentOutlined onClick={() => {
                        onShowModalComment(id)
                    }}/>
                </div>
                <div className='icon'>
                    <MailOutlined onClick={onShowModalEmail}/>
                </div>
            </div>
        </div>
    );
}

export default CandidateItem;