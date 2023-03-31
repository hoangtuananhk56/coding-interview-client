import { Input } from 'antd';
import {
    MinusCircleOutlined, PlusCircleOutlined
} from '@ant-design/icons';
import './index.scss';

const Item = ({ value, index, onHandleInput, onChange, isLastItem, onAdd, onDelete }) => {

    return (
        <div className='item'>
            <input className="form-check-input" type="checkbox" id="check1" name="option1" value="something" onChange={() => onChange(index)} checked={value.ischeck} />
            <Input className='input-1' placeholder='type title' value={value.option} onChange={(e) => onHandleInput(index, e.target.value)}/>
            {isLastItem ?
                <PlusCircleOutlined style={{ color: 'blue', fontSize: 20, marginLeft: 5 }} onClick={() => onAdd()}/>
                : <MinusCircleOutlined style={{ color: 'red', fontSize: 20, marginLeft: 5 }} onClick={() => onDelete(index)} />
            }
        </div>
    )
}

const CheckboxItem = ({ checkbox, setCheckbox }) => {
    const onChange = (index) => {
        let arr = checkbox
        arr[index].ischeck = !checkbox[index].ischeck
        setCheckbox([...arr])
    };
    const onAdd = () => {
        setCheckbox([...checkbox, {ischeck: false, option: ''}])
    }
    const onDelete = (index) => {
        let arr = checkbox
        arr.splice(index, 1)
        setCheckbox([...arr])
    }
    const onHandleInput = (index, value) => {
        console.log(index);
        let arr = checkbox
        arr[index].option = value
        setCheckbox([...arr])
    }
    return (
        <div className="form-check">
            {checkbox && checkbox.map((e, index) => {
                if (index === checkbox.length - 1) return (
                    <Item key={index} index={index} value={e} onChange={onChange} onHandleInput={onHandleInput} isLastItem={true} onAdd={onAdd}/>
                )
                return <Item key={index} index={index} value={e} onChange={onChange} onDelete={onDelete} onHandleInput={onHandleInput} />
            })
            }
        </div>
    );
}

export default CheckboxItem;