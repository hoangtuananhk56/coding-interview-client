import { Input } from 'antd';
import './candidateitem.scss';

const {TextArea} = Input
const CandidateWriting = () => {
    return (
        <div className='candidate-writing'>
            <TextArea rows={16}/>
        </div>
    );
}

export default CandidateWriting;