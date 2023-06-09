import { DeleteOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import './index.scss';


const TestCaseItem = ({ handleTestCase, index, elemement }) => {
    return (
        <>
            <div className='row'>
                <div className='title'>
                    Test input
                </div>
                <div className='input-2'>
                    <Input onChange={e => handleTestCase('input', e.target.value, index)} value={elemement.input}/>
                </div>
            </div>
            <div className='row'>
                <div className='title'>
                    Output
                </div>
                <div className='input-2' >
                    <Input onChange={e => handleTestCase('output', e.target.value, index)} value={elemement.output}/>
                </div>
            </div>
        </>
    )
}

const CodingItem = ({coding, setCoding}) => {
    const handleCoding = (title, value) => {
        switch (title) {
            case "input":
                setCoding({ ...coding, input: value })
                break;
            case "output":
                setCoding({ ...coding, output: value })
                break;
            default:
                break;
        }
    }
    const handleTestCase = (title, value, index) => {
        let myTestCase = coding.testcase
        switch (title) {
            case 'input':
                myTestCase[index].input = value
                break;
            case 'output':
                myTestCase[index].output = value
                break;
            default:
                break;
        }
        setCoding({ ...coding, testcase: myTestCase })
    }
    const handlePlus = () => {
        let item = {
            input: '',
            output: ''
        }
        let myTestcase = coding.testcase
        myTestcase.push(item)
        setCoding({ ...coding, testcase: myTestcase })
    }
    const hadnleDelete = () => {
        let myTestcase = coding.testcase
        myTestcase.pop()
        setCoding({ ...coding, testcase: myTestcase })
    }
    return (
        <>
            <div className='row'>
                <div className='title'>
                    Input
                </div>
                <div className='input-2'>
                    <Input onChange={e => handleCoding('input', e.target.value)} value={coding.input}/>
                </div>
            </div>

            <div className='row'>
                <div className='title'>
                    Output
                </div>
                <div className='input-2'>
                    <Input onChange={e => handleCoding('output', e.target.value)} value={coding.output}/>
                </div>
            </div>
            <div className='testcase-list'>
                {
                    coding.testcase && coding.testcase.map((e, index) => {
                        return <TestCaseItem key={index} handleTestCase={handleTestCase} index={index} elemement={e}/>
                    })
                }
            </div>
            <div className='row'>
                <div className='title'>

                </div>
                <div className='icon'>
                    <PlusSquareOutlined onClick={handlePlus}/>
                    <DeleteOutlined onClick={e => hadnleDelete(e)}/>
                </div>
            </div>
        </>
    );
}

export default CodingItem;