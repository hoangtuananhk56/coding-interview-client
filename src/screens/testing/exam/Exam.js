import { Button, Form, Input, Select, Radio, Table, Typography } from 'antd';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {
    LeftOutlined, PlusSquareOutlined, DeleteOutlined
} from '@ant-design/icons';
import ChallengeTag from '../../../components/testing/challengeTag'
import CodingItem from '../../../components/testing/CodingItem'
import CheckboxItem from '../../../components/testing/CheckboxItem'
import './exam.scss'
import RadioItem from '../../../components/testing/RadioItem';
const { Search, TextArea } = Input;
const originData = [];
for (let i = 0; i < 3; i++) {
    originData.push({
        key: i,
        id: i,
        title: "SQL " + i,
        tag: 'SQL'
    });
}

const Exam = () => {
    const navigate = useNavigate();
    const [value, setValue] = useState(1);
    const onSearch = () => {
        console.log("onSearch")
    }
    const handleChange = () => console.log("handleChange")
    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };
    return (
        <div className="exam">
            <div className='left-exam'>
                <div className='left-exam-body'>
                    <div className='back-title'>
                        <LeftOutlined style={{ fontSize: 18 }} />
                        Testing
                    </div>
                    <div className='row'>
                        <div className='title'>
                            Title
                        </div>
                        <Input className='input-1' placeholder='type title' />
                        <div className='title' style={{ width: 120 }}>
                            ChallengeType
                        </div>
                        <Select
                            defaultValue="sql"
                            style={{
                                width: 120,
                            }}
                            onChange={handleChange}
                            options={[
                                {
                                    value: 'sql',
                                    label: 'SQL',
                                },
                                {
                                    value: 'algorithm',
                                    label: 'Algorithm',
                                },
                                {
                                    value: 'knowledge',
                                    label: 'Knowledge',
                                },
                            ]}
                        />
                    </div>
                    <div className='row'>
                        <div className='title'>
                            Type
                        </div>
                        <div className='option'>
                            <Radio.Group onChange={onChange} value={value}>
                                <Radio value={1}>Coding</Radio>
                                <Radio value={2}>Check box</Radio>
                                <Radio value={3}>Radio</Radio>
                                <Radio value={4}>Writting</Radio>
                            </Radio.Group>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='title'>
                            Content
                        </div>
                        <div className='input-2'>
                            <TextArea rows={4} />
                        </div>
                    </div>
                    {value == 1 && <CodingItem />}
                    {value == 2 && <CheckboxItem />}
                    {value == 3 && <RadioItem />}
                    {value == 4 &&
                        <div className='row' style={{marginTop: 10}}>
                            <div className='title'>
                                Result
                            </div>
                            <div className='input-2'>
                                <TextArea rows={4} />
                            </div>
                        </div>
                    }

                </div>
                <div className='left-exam-footer'>
                    <Button prefixCls='create-btn-exam'>CREATE</Button>
                </div>
            </div>
            <div className='right-exam'>
                <div className='header-list'>
                    List
                    <Search
                        className='search-input'
                        placeholder="Enter exam"
                        onSearch={onSearch}
                        style={{
                            width: 350,
                        }}
                    />
                </div>
                <div className='challenge-list'>
                    {
                        originData && originData.map(e => {
                            return (
                                <ChallengeTag id={e.id} title={e.title} tag={e.tag} />
                            )
                        })
                    }
                </div>
                <div className='challenge-list-footer'>
                    <Button prefixCls='create-btn-exam'>CREATE</Button>
                </div>
            </div>
        </div>
    )
}

export default Exam;