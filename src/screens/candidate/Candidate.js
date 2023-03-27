import { Button, Form, Input, Pagination, Modal, Select, notification } from 'antd';
import React, { useState, useEffect } from 'react';
import { SmileOutlined } from '@ant-design/icons';
import './candidate.scss';
import CandidateItem from '../../components/candidate/CandidateItem';
import candidateApi from '../../http/candidate';
import commentApi from '../../http/commentAPI';
const { Search } = Input;

const Candidate = () => {
  const [isModalOpenComment, setIsModalOpenComment] = useState(false);
  const [isModalOpenEmail, setIsModalOpenEmail] = useState(false);
  const [isModalOpenCreation, setIsModalOpenCreation] = useState(false);
  const [candidates, setCandidates] = useState([]);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState();
  const [currentCandidateId, setCurrentCandidateId] = useState();
  const [count, setCount] = useState(0);
  const [form] = Form.useForm()
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  useEffect(() => {
    candidateApi.getAll(page, perPage).then(res => {
      setCandidates(res.data)
      setCount(res.count)
    })
  }, [page, perPage]);
  const onHandleCandidate = (value) => {
    candidateApi.create(value).then(res => {
      setIsModalOpenCreation(false);
      openNotification()
      candidateApi.getAll(page, perPage).then(res => {
        setCandidates(res.data)
      })
      form.resetFields()
    }).catch(err => {
      //TODO: Show error message 
    })
  }
  const getAllCommentByID = (id) => {
    commentApi.getAll(id).then(res => {
      setComments(res.data)
    }).catch(err => {
      //TODO: show error message
      setComments([])
    })
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
  const onSearch = (value) => {
    if (value != '') {
      candidateApi.search(value, page, perPage).then(res => {
        setCandidates(res.data)
        setCount(res.count)
      })
    } else {
      candidateApi.getAll(page, perPage).then(res => {
        setCandidates(res.data)
        setCount(res.count)
      })
    }
  };
  const onShowModalComment = (id) => {
    setIsModalOpenComment(true);
    getAllCommentByID(id)
    setCurrentCandidateId(id)
  };
  const handleCreateComment = () => {
    console.log(comment, 111)
    if (comment !== undefined) {
      commentApi.create(comment).then(res => {
        openNotification()
      })
    }
    setComment('')
    handleOk()
  }
  const handleOk = () => {
    setIsModalOpenComment(false);
    setIsModalOpenEmail(false);
    setIsModalOpenCreation(false);
  };
  const handleCancel = () => {
    setIsModalOpenComment(false);
    setIsModalOpenEmail(false);
    setIsModalOpenCreation(false);
  };
  const onShowModalEmail = () => {
    setIsModalOpenEmail(true);
  };
  const onShowModalCreate = () => {
    setIsModalOpenCreation(true);
  };
  const handleChange = () => console.log("handleChange")
  return (
    <div className="home">
      <div className="title-1">
        <div className='home-search'>
          <Search
            className='search-input'
            placeholder="Enter Candidates"
            onSearch={onSearch}
            style={{
              width: 200,
            }}
          />
          <Button prefixCls='create-btn' onClick={onShowModalCreate}>CREATE</Button>
        </div>
      </div>
      <div className='candidate-table'>
        <div className='row'>
          <div className='ids'>IDs</div>
          <div className='name'>Name</div>
          <div className='email'>Email</div>
          <div className='create_at'>CreateAt</div>
          <div className='update_at'>UpdateAt</div>
          <div className='challenge'>Challenge</div>
          <div className='resolved'>Resolved</div>
          <div className='point'>Point</div>
          <div className='phone'>Phone</div>
          <div className='action'>Action</div>
        </div>
        {
          candidates && candidates.map((e, index) => {
            return (
              <CandidateItem id={e._id} index={index} name={e.name} email={e.email} create_at={e.createdAt} update_at={e.updatedAt} challenge={e.challenge} resolved={e.resolved} point={e.point} phone={e.phone} onShowModalComment={onShowModalComment} onShowModalEmail={onShowModalEmail} />
            )
          })
        }
      </div>
      <Pagination
        className="custom-pagination"
        total={count}
        defaultPageSize={10}
        pageSizeOptions={['10', '25', '50']}
        showSizeChanger
        showTotal={(total, range) => `${range[0] >= 0 ? range[0] : 0}-${range[1] >= 0 ? range[1] : 0} per ${total}`}
        onChange={(page, size) => {
          setPage(page)
          setPerPage(size)
        }}
      />
      <Modal title="Comment Modal"
        open={isModalOpenComment}
        onOk={handleOk} onCancel={handleCancel}
        footer={(
          <Button className="bg-green text-white border-white mt-5" onClick={handleCreateComment}>
            Create
          </Button>)}
      >
        <div style={{ maxHeight: 300, overflow: 'auto' }}>
          {comments && comments.map(e => {
            return (
              <div className='row'>
                <p>{e.name} : </p>
                <p>{e.content}</p>
              </div>
            )
          })}
        </div>
        <Input type='text' placeholder='comment...' onChange={e => setComment({
          candidate_id: currentCandidateId,
          content: e.target.value,
          name: localStorage.getItem('name')
        })} />
      </Modal>
      <Modal title="Candidate Invitation" open={isModalOpenEmail} onOk={handleOk} onCancel={handleCancel}>
        <div className='row'>
          <div className='title'>Challenge</div>
          <Select
            defaultValue="junior"
            style={{
              width: 120,
            }}
            onChange={handleChange}
            options={[
              {
                value: 'junior',
                label: 'Junior',
              },
              {
                value: 'middle',
                label: 'Midlle',
              },
              {
                value: 'senior',
                label: 'Senior',
              },
            ]}
          />
        </div>
        <div className='row'>
          <div className='title'>
            Email
          </div>
          <Input type='text' placeholder={`Candidate's email`} />
        </div>
      </Modal>
      {contextHolder}
      <Form labelCol={{
        span: 6,
      }}
        wrapperCol={{
          span: 18,
        }}
        id={"Candidate-Creation"} onFinish={onHandleCandidate} form={form}>
        <Modal title="Candidate Creation"
          footer={(
            <Button className="bg-green text-white border-white mt-5" form={'Candidate-Creation'} key="submit" htmlType="submit">
              Create
            </Button>)}
          open={isModalOpenCreation} onCancel={handleCancel}>
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input candidate name!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input candidate email!',
              },
            ]}
          >
            <Input type='email' />
          </Form.Item>
          <Form.Item
            label="Challenge"
            name="challenge"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              {
                required: true,
                message: 'Please input phone name!',
              },
            ]}
          >
            <Input type='number' />
          </Form.Item>
        </Modal>
      </Form>
    </div>

  );
};

export default Candidate;