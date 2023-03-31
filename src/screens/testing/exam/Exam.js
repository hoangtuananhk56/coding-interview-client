import {
    LeftOutlined
} from '@ant-design/icons';
import { Button, Input, Radio, Select, notification } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import ChallengeTag from '../../../components/testing/challengeTag';
import CheckboxItem from '../../../components/testing/CheckboxItem';
import CodingItem from '../../../components/testing/CodingItem';
import RadioItem from '../../../components/testing/RadioItem';
import examAPI from '../../../http/examAPI';
import './exam.scss';
import challengeAPI from '../../../http/challengeAPI';
const { Search, TextArea } = Input;

const Exam = () => {
    const navigate = useNavigate();
    const [value, setValue] = useState('check_box');
    const [challengeName, setChallengeName] = useState('');
    const [examList, setExamList] = useState([]);
    const [exam, setExam] = useState({
        title: '',
        challenge_type: 'algorithm',
        type: 'check_box',
        content: ""
    });

    const [coding, setCoding] = useState({
        input: '',
        output: '',
        testcase: [
            {
                input: '',
                output: ''
            }
        ]
    });

    const [checkbox, setCheckbox] = useState([
        {
            ischeck: true,
            option: "",
        }
    ]);

    const onSearch = () => {
        console.log("onSearch")
    }

    const handleChallengeTest = () => {
        let examId = []
        examList.forEach(e => {
            examId.push(e._id)
        })
        let body = {
            name: challengeName,
            examids: examId
        }
        challengeAPI.create(body).then(() => {
            openNotification()
            navigate("/test")
        }).catch(err => {
            navigate("/test")
            console.log(err)
        })
    }

    const handleChange = (e) => setExam({ ...exam, challenge_type: e })
    const onChange = (e) => {
        setValue(e.target.value);
        setExam({ ...exam, type: e.target.value })
    };

    const handleCreateExam = () => {
        let body = {
            title: exam.title,
            challenge_type: exam.challenge_type,
            type: exam.type,
            content: exam.content,
            coding,
            checkbox
        }

        examAPI.create(body).then(res => {
            setExamList([...examList, res.data])
            openNotification()
        }).catch(err => console.log(err))

    }

    const onHandleChange = (type, value) => {
        switch (type) {
            case 'title':
                setExam({ ...exam, title: value })
                break;
            case 'content':
                setExam({ ...exam, content: value })
                break;
            case 'challenge-name':
                setChallengeName(value)
                break;
            default:
                break;
        }
    }
    const [api, contextHolder] = notification.useNotification();
    const openNotification = () => {
        api.open({
            message: 'Notification Title',
            description:
                'Create a new record successfully',
            icon: (
                <SmileOutlined
                    style={{
                        color: '#4caf50',
                    }}
                />
            ),
        });
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
                        <Input className='input-1' placeholder='type title' onChange={e => onHandleChange('title', e.target.value)} />
                        <div className='title' style={{ width: 120 }}>
                            ChallengeType
                        </div>
                        <Select
                            defaultValue="algorithm"
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
                                <Radio key={1} value={"coding"}>Coding</Radio>
                                <Radio key={2} value={'check_box'}>Check box</Radio>
                                <Radio key={3} value={'radio'}>Radio</Radio>
                                <Radio key={4} value={'writing'}>Writing</Radio>
                            </Radio.Group>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='title'>
                            Content
                        </div>
                        <div className='input-2'>
                            <TextArea rows={4} onChange={e => onHandleChange('content', e.target.value)} />
                        </div>
                    </div>
                    {value === 'coding' && <CodingItem coding={coding} setCoding={setCoding} />}
                    {value === 'check_box' && <CheckboxItem checkbox={checkbox} setCheckbox={setCheckbox} />}
                    {value === 'radio' && <RadioItem />}
                    {value === 'writing' &&
                        <div className='row' style={{ marginTop: 10 }}>
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
                    <Button prefixCls='create-btn-exam' onClick={handleCreateExam}>CREATE</Button>
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
                <div className='header-list'>
                    <span style={{ fontSize: 14 }}>Name</span>
                    <Input className='input-1' placeholder='Challenge Name' style={{ width: 350 }} onChange={e => onHandleChange('challenge-name', e.target.value)} />
                </div>
                <div className='challenge-list'>
                    {
                        examList && examList.map(e => {
                            return (
                                <ChallengeTag key={e.id} id={e.id} title={e.title} tag={e.challenge_type} />
                            )
                        })
                    }
                </div>
                <div className='challenge-list-footer'>
                    <Button prefixCls='create-btn-exam' onClick={handleChallengeTest}>CREATE</Button>
                </div>
            </div>
            {contextHolder}
        </div>
    )
}

export default Exam;