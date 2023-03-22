import { Button, Form, Input, Select, Radio, Table, Typography } from 'antd';
import {
    LeftOutlined, PlusSquareOutlined, DeleteOutlined
} from '@ant-design/icons';
import './index.scss';

const testCase = [1, 2, 3,4,5,6,7,78,8,9,90,0,0]

const TestCaseItem = ({ inputValue, outputValue }) => {
    return (
        <>
            <div className='row'>
                <div className='title'>
                    Test input
                </div>
                <div className='input-2' onChange={inputValue}>
                    <Input />
                </div>
            </div>
            <div className='row'>
                <div className='title'>
                    Output
                </div>
                <div className='input-2' onChange={outputValue}>
                    <Input />
                </div>
            </div>
        </>
    )
}

const CodingItem = () => {
    return (
        <>
             <div className='row'>
                        <div className='title'>
                            Input
                        </div>
                        <div className='input-2'>
                            <Input />
                        </div>
                    </div>

                    <div className='row'>
                        <div className='title'>
                            Output
                        </div>
                        <div className='input-2'>
                            <Input />
                        </div>
                    </div>
                    <div className='testcase-list'>
                        {
                            testCase && testCase.map(e => {
                                return <TestCaseItem />
                            })
                        }
                    </div>
                    <div className='row'>
                        <div className='title'>

                        </div>
                        <div className='icon'>
                            <PlusSquareOutlined />
                            <DeleteOutlined />
                        </div>
                    </div>
        </>
    );
}

export default CodingItem;