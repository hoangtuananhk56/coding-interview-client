import { Input } from 'antd';
import {
    MinusCircleOutlined, PlusCircleOutlined
} from '@ant-design/icons';
import './index.scss';

const Item = ({ value, index, onHandleInput, onChange, isLastItem, onAdd, onDelete }) => {

    return (
        <div className='item'>
              <input className="form-check-input" type="radio" id="check1" name="option1" value="something" onChange={() => onChange(index)} checked={value.ischeck} />
            <Input className='input-1' placeholder='type title' value={value.option} onChange={(e) => onHandleInput(index, e.target.value)}/>
            {isLastItem ?
                <PlusCircleOutlined style={{ color: 'blue', fontSize: 20, marginLeft: 5 }} onClick={() => onAdd()}/>
                : <MinusCircleOutlined style={{ color: 'red', fontSize: 20, marginLeft: 5 }} onClick={() => onDelete(index)} />
            }
        </div>
    )
}

const RadioItem = ({ radio, setRadio }) => {
    const onChange = (index) => {
        console.log(index);
        let arr = radio
        arr.forEach(e => {
            e.ischeck = false
        })
        arr[index].ischeck = !radio[index].ischeck
        setRadio([...arr])
    };

    const onAdd = () => {
        setRadio([...radio, {ischeck: false, option: ''}])
    }
    const onDelete = (index) => {
        let arr = radio
        arr.splice(index, 1)
        setRadio([...arr])
    }
    const onHandleInput = (index, value) => {
        // console.log(index);
        let arr = radio
        arr[index].option = value
        setRadio([...arr])
    }
    return (
        <div className="form-check">
            {radio && radio.map((e, index) => {
                if (index === radio.length - 1) return (
                    <Item value={e} key={index} index={index} onChange={onChange} isLastItem={true} onHandleInput={onHandleInput} onAdd={onAdd}/>
                )
                return <Item key={index} value={e} index={index} onChange={onChange} onHandleInput={onHandleInput} onDelete={onDelete}/>
            })
            }
        </div>
    );
}

export default RadioItem;