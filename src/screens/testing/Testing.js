import { SmileOutlined } from '@ant-design/icons';
import { Button, Input, notification, Pagination } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import ChallengeItem from '../../components/challenge/ChallengeItem';
import challengeAPI from '../../http/challengeAPI';
import './testing.scss';
const { Search } = Input;

const Testing = () => {
  const navigate = useNavigate();
  const [challenges, setChallenges] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [api, contextHolder] = notification.useNotification();
  const openNotification = () => {
    api.open({
      message: 'Notification Title',
      description:
        'Delete this record successfully',
      icon: (
        <SmileOutlined
          style={{
            color: '#4caf50',
          }}
        />
      ),
    });
  };
  useEffect(() => {
    challengeAPI.getAll(page, perPage).then(res => {
      setChallenges(res.data)
      setCount(res.count)
    })
  }, [page, perPage]);
  
  const onSearch = (value) => {
    if (value !== '') {
      challengeAPI.search(value, page, perPage).then(res => {
        setChallenges(res.data)
        setCount(res.count)
      }).catch(err => {
        setChallenges([])
        setCount(0)
      })
    } else {
      challengeAPI.getAll(page, perPage).then(res => {
        setChallenges(res.data)
        setCount(res.count)
      })
    }
  };
  const onDelete = (id) => {
    challengeAPI.deletebyId(id).then(res => {
      openNotification()
      challengeAPI.getAll(page, perPage).then(res => {
        setChallenges(res.data)
        setCount(res.count)
      })
    })
  }
  const onEdit = (id) => {
    navigate(`exam/${id}`)
  }
  return (
    <div className="home">
      <div className="title-1">
        <div className='exam-search'>
          <div className='title-icon' title='Back to prepage'>
          </div>
          <div className='right-search'>
            <Search 
              className='search-input'
              placeholder="Enter Candidates"
              onSearch={onSearch}
              style={{
                width: 200,
              }}
            />
            <Button prefixCls='create-btn' onClick={() =>{navigate("exam")}}>CREATE</Button>
          </div>
        </div>
      </div>
      <div className='my-table'>
        {
          challenges && challenges.map((e, index) => {
            return (
              <ChallengeItem id={e._id} title={e.name} index={index} updatedAt={e.updatedAt} onEdit={onEdit} onDelete={onDelete}/>
            )
          })
        }
      </div>
      <Pagination
          className="custom-pagination"
          total={count}
          defaultPageSize={5}
          showLessItems={true}
          pageSizeOptions={['5', '10', '15']}
          showSizeChanger
          showTotal={(total, range) => `${range[0] >= 0 ? range[0] : 0}-${range[1] >= 0 ? range[1] : 0} per ${total}`}
          onChange={(page, size) => {
            setPage(page)
            setPerPage(size)
          }}
        />
        {contextHolder}
    </div>
  );
};

export default Testing;