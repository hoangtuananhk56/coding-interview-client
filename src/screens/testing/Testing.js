import { Button, Input, Pagination } from 'antd';
import { useNavigate } from "react-router-dom";
import ChallengeItem from '../../components/challenge/ChallengeItem';
import './testing.scss';
const { Search } = Input;
const originData = [];

for (let i = 0; i < 17; i++) {
  originData.push({
    key: i,
    id: i,
    title: "Testing "+i,
    isEdit: true,
    isEmail: true,
    isDelete: true,
  });
} 


const Testing = () => {
  const navigate = useNavigate();
  const onSearch = (value) => console.log(value);
  return (
    <div className="home">
      <div className="title-1">
        <div className='exam-search'>
          <div className='title-icon' title='Back to prepage'>
            {/* <LeftOutlined />
            Testing */}
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
            <Button prefixCls='create-btn'>CREATE</Button>
          </div>
        </div>
      </div>
      <div className='my-table'>
        {
          originData && originData.map(e => {
            return (
              <ChallengeItem id={e.id} title={e.title} isEdit={e.isEdit} isEmail={e.isEmail} isDelete={e.isDelete}/>
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
    </div>
  );
};

export default Testing;