import { Button, Form, Input, Pagination, Modal, Select, Typography } from 'antd';
import { useState } from 'react';
import './candidate.scss';
import CandidateItem from '../../components/candidate/CandidateItem';
const { Search } = Input;
const originData = [];
const comments = []
for (let i = 0; i < 10; i++) {
  originData.push({
    key: i,
    id: i,
    create_at: 123123213,
    update_at: 23234234,
    name: "Phillip " + i,
    email: `anhht ${i}@gmail.com`,
    challenge: "challenge " + i,
    resolved: "resolved " + i,
    point: "point " + i,
    phone: "0123456789"
  });
  comments.push({
    author: "David",
    comment: "Good"
  })
}
const Candidate = () => {
  const [isModalOpenComment, setIsModalOpenComment] = useState(false);
  const [isModalOpenEmail, setIsModalOpenEmail] = useState(false);
  const [isModalOpenCreation, setIsModalOpenCreation] = useState(false);
  const onSearch = (value) => console.log(value);
  const onShowModalComment = () => {
    setIsModalOpenComment(true);
  };
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
          originData && originData.map(e => {
            return (
              <CandidateItem id={e.id} name={e.name} email={e.email} create_at={e.create_at} update_at={e.update_at} challenge={e.challenge} resolved={e.resolved} point={e.point} phone={e.phone} onShowModalComment={onShowModalComment} onShowModalEmail={onShowModalEmail} />
            )
          })
        }
      </div>
      <Pagination
        className="custom-pagination"
        // locale={{ items_per_page: '' }}
        total={originData.length}
        defaultPageSize={5}
        showLessItems={true}
        pageSizeOptions={['5', '10', '15']}
        showSizeChanger
        showTotal={(total, range) => `${range[0] >= 0 ? range[0] : 0}-${range[1] >= 0 ? range[1] : 0} per ${total}`}
        onChange={(page, size) => {
          // setPageIndex(page)
          // setPageSize(size)
          // setIsShowLess(() => {
          //   return page > 4
          // })
        }}
      />
      <Modal title="Comment Modal" open={isModalOpenComment} onOk={handleOk} onCancel={handleCancel}>
        <div style={{ maxHeight: 300, overflow: 'auto' }}>
          {comments && comments.map(e => {
            return (
              <div className='row'>
                <p>{e.author} : </p>
                <p>{e.comment}</p>
              </div>
            )
          })}
        </div>
        <Input type='text' placeholder='comment...' />
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
      <Modal title="Candidate Creation" open={isModalOpenCreation} onOk={handleOk} onCancel={handleCancel}>
        <div className='row'>
          <div className='title'>Name</div>
          <Input type='text'/>
        </div>
        <div className='row'>
          <div className='title'> Email </div>
          <Input type='text'/>
        </div>
        <div className='row'>
          <div className='title'> Challenge </div>
          <Input type='text' />
        </div>
        <div className='row'>
          <div className='title'> Phone </div>
          <Input type='text' />
        </div>
      </Modal>
    </div>

  );
};

export default Candidate;