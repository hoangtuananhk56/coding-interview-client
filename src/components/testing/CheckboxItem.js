import { Input } from 'antd';
import {
    MinusCircleOutlined, PlusCircleOutlined
} from '@ant-design/icons';
import './index.scss';

const testCase = [1, 2, 3, 4, 5, 6, 7, 78, 8, 9, 90, 0, 0]
// const testCase = [1]

const Item = ({value, index, onChange, checked, isLastItem }) => {
    
    return (
        <div className='item'>
            <input className="form-check-input" type="checkbox" id="check1" name="option1" value="something" onChange={() => onChange(index)} checked={value.ischeck}/>
            <Input className='input-1' placeholder='type title' />
            {isLastItem ? 
            <PlusCircleOutlined style={{color: 'blue', fontSize: 20, marginLeft: 5}}/>
            : <MinusCircleOutlined  style={{color: 'red', fontSize: 20, marginLeft: 5}}/>
            }
        </div>
    )
}

const CheckboxItem = ({checkbox, setCheckbox}) => {
    const onChange = (index) => {
        console.log('checked = ');
    };
    return (
        <div className="form-check">
            {checkbox && checkbox.map(( e, index )=> {
                if (index == testCase.length - 1) return (
                    <Item key={index} index={index} value={e} onChange={onChange} isLastItem={true}/>
                )
                return <Item key={index} index={index} value={e} onChange={onChange} />
            })
            }                               
        </div>
    );
}

export default CheckboxItem;