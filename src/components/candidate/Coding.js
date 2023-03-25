import { Button, Input, Tabs, Select } from 'antd';
import './candidateitem.scss';

const {TextArea} = Input
const { TabPane } = Tabs;
const Coding = () => {
    const callback = (key) => {
        console.log(key);
    }
    const handleChange = () => {
        console.log("handleChange");
    }
    return (
        <div className='candidate-writing'>
            <TextArea rows={20}/>
            <div className='row'>
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
                <div className='run-btn'>
                    <Button className='run-code-btn' style={{backgroundColor:'#7CB342'}}>Run Code</Button>
                    <Button className='run-code-btn' style={{backgroundColor:'#43A047'}}>Submit</Button>
                </div>
            </div>
            {/* <div className='response-message'>
                Runtime Error
            </div> */}
            <div className='response-message' style={{color: '#4caf50'}}>
                Successfully
            </div>
            <div className='candidate-writing-result'>
            <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="Tab 1" key="1">
                Content of Tab Pane 1
                </TabPane>
                <TabPane tab="Tab 2" key="2">
                Content of Tab Pane 2
                </TabPane>
                <TabPane tab="Tab 3" key="3">
                Content of Tab Pane 3
                </TabPane>
            </Tabs>
                {/* <div className='sample-test-list'>
                    <div>
                        Sample test 
                    </div>
                </div>
                <div className='sample-test-result'>
                Message: “ERROR 1064 (42000) at line 1: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'asdasd' at line 1”
                </div> */}
            </div>
        </div>
    );
}

export default Coding;