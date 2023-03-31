import {
    LeftOutlined, SmileOutlined
} from '@ant-design/icons';
import { Button, Input, notification, Radio, Select } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import ChallengeTag from '../../../components/testing/challengeTag';
import CheckboxItem from '../../../components/testing/CheckboxItem';
import CodingItem from '../../../components/testing/CodingItem';
import RadioItem from '../../../components/testing/RadioItem';
import challengeAPI from '../../../http/challengeAPI';
import examAPI from '../../../http/examAPI';
import './exam.scss';
const { Search, TextArea } = Input;

const ExamEditing = (props) => {
    const navigate = useNavigate();
    const { id } = useParams();
    // const [value, setValue] = useState('coding');
    const [challengeName, setChallengeName] = useState('');
    const [, setChallenge] = useState();
    const [examList, setExamList] = useState([]);
    const [exam, setExam] = useState();

    const [coding, setCoding] = useState({
        input: '',
        output: '',
        testcase: [
            {
                input: '',
                output: ''
            }
        ]
    })

    const [checkbox, setCheckbox] = useState([
        {
            ischeck: true,
            option: "",
        }
    ]);

    const [radio, setRadio] = useState([
        {
            ischeck: false,
            option: "",
        }
    ]);

    const [writing, setWriting] = useState({
        result: ''
    })

    useEffect(() => {
        challengeAPI.getbyId(id).then(res => {
            setChallenge(res.data)
            setChallengeName(res.data.name)
            if (res.data.examids.length !== 0) {
                res.data.examids.forEach(item => {
                    examAPI.getbyId(item).then(res1 => {
                        // debugger
                        setExam(res1.data)
                        let arr = examList
                        //Check exist item
                        let index = arr.findIndex(e => {
                            return e._id === res1.data._id
                        })

                        if (index === -1) {
                            arr.push(res1.data)
                            setExamList(arr)
                            setCoding(res1.data.coding)
                            setCheckbox(res1.data.checkbox)
                        }
                    })
                })
            }
        }).catch(err => {
            console.log(err);
        })
    }, [id,examList])

    const onSearch = () => {
        console.log("onSearch")
    }

    const handleChallengeUpdate = () => {
        let examId = []
        examList.forEach(e => {
            examId.push(e._id)
        })
        let body = {
            name: challengeName,
            examids: examId
        }
        challengeAPI.update(id, body).then(() => {
            openNotification()
            navigate("/test")
        }).catch(err => {
            navigate("/test")
            console.log(err)
        })
    }

    const handleChange = (e) => setExam({ ...exam, challenge_type: e })
    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        // setValue(e.target.value);
        setExam({ ...exam, type: e.target.value })
    };

    const handleUpdateExam = () => {
        let body = {
            title: exam.title,
            challenge_type: exam.challenge_type,
            type: exam.type,
            content: exam.content,
            coding,
            checkbox,
            radio,
            writing
        }

        examAPI.update(exam._id, body).then(res => {
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
                case 'writing':
                    setWriting({...writing, result: value})
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

    const onDeleteExam = (id) => {
        let arr = examList
        arr = arr.filter(item => item._id !== id)
        setExamList(arr)
    }
    const onSelect = (id) => {
        let e = examList.find(e => e._id === id)
        setExam(e)
        setCoding(e.coding)
    }
    if (!exam) return (
        <>Loading!</>
    );
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
                        <Input className='input-1' placeholder='type title' value={exam.title} onChange={e => onHandleChange('title', e.target.value)} />
                        <div className='title' style={{ width: 120 }}>
                            ChallengeType
                        </div>
                        <Select
                            defaultValue={exam.challenge_type}
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
                            <Radio.Group onChange={onChange} value={exam.type}>
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
                            <TextArea rows={4} onChange={e => onHandleChange('content', e.target.value)} value={exam.content} />
                        </div>
                    </div>
                    {exam.type === 'coding' && <CodingItem coding={coding} setCoding={setCoding} />}
                    {exam.type === 'check_box' && <CheckboxItem checkbox={checkbox} setCheckbox={setCheckbox} />}
                    {exam.type === 'radio' && <RadioItem radio={radio} setRadio={setRadio}/>}
                    {exam.type === 'writing' &&
                        <div className='row' style={{ marginTop: 10 }}>
                            <div className='title'>
                                Result
                            </div>
                            <div className='input-2'>
                                <TextArea rows={4} onChange={e => onHandleChange('writing', e.target.value)} />
                            </div>
                        </div>
                    }

                </div>
                <div className='left-exam-footer'>
                    <Button prefixCls='create-btn-exam' onClick={handleUpdateExam}>UPDATE</Button>
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
                    <Input className='input-1' placeholder='Challenge Name' value={challengeName} style={{ width: 350 }} onChange={e => onHandleChange('challenge-name', e.target.value)} />
                </div>
                <div className='challenge-list'>
                    {
                        examList && examList.map(e => {
                            return (
                                <ChallengeTag key={e._id} id={e._id} title={e.title} tag={e.challenge_type} onSelect={onSelect} onDelete={onDeleteExam} />
                            )
                        })
                    }
                </div>
                <div className='challenge-list-footer'>
                    <Button prefixCls='create-btn-exam' onClick={handleChallengeUpdate}>UPDATE</Button>
                </div>
            </div>
            {contextHolder}
        </div>
    )
}

export default ExamEditing;