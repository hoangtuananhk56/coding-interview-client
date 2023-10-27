import { LeftOutlined, SmileOutlined } from "@ant-design/icons";
import { Button, Input, notification, Radio, Select } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ChallengeTag from "../../../components/testing/challengeTag";
import CheckboxItem from "../../../components/testing/CheckboxItem";
import CodingItem from "../../../components/testing/CodingItem";
import RadioItem from "../../../components/testing/RadioItem";
import challengeAPI from "../../../http/challengeAPI";
import examAPI from "../../../http/examAPI";
import "./exam.scss";
const { Search, TextArea } = Input;

const ExamEditing = (props) => {
  const navigate = useNavigate();
  const { id } = useParams();
  // const [value, setValue] = useState('coding');
  const [challengeName, setChallengeName] = useState("");
  const [, setChallenge] = useState();
  const [examList, setExamList] = useState([]);

  const [coding, setCoding] = useState({
    input: "",
    output: "",
    testcase: [
      {
        input: "",
        output: "",
      },
    ],
  });

  const [checkbox, setCheckbox] = useState([
    {
      ischeck: true,
      option: "",
    },
  ]);

  const [radio, setRadio] = useState([
    {
      ischeck: false,
      option: "",
    },
  ]);

  const [writing, setWriting] = useState({
    result: "",
  });
  const [exam, setExam] = useState({
    id: "",
    title: "",
    challenge_type: "sql",
    checkbox: checkbox,
    coding: coding,
    radio: radio,
    writing: writing,
    type: "coding",
    content: "",
  });

  useEffect(() => {
    challengeAPI
      .getbyId(id)
      .then((res) => {
        setChallenge(res.data);
        setChallengeName(res.data.name);
        if (res.data.examids.length !== 0) {
          res.data.examids.forEach((item) => {
            examAPI.getbyId(item).then((res1) => {
              let arr = examList;
              //Check exist item
              let index = arr.findIndex((e) => {
                return e._id === res1.data._id;
              });

              if (index === -1) {
                arr.push(res1.data);
                setExam({
                  id: res1.data._id,
                  title: res1.data.title,
                  challenge_type: res1.data.challenge_type,
                  checkbox: res1.data.checkbox,
                  coding: res1.data.coding,
                  radio: res1.data.radio,
                  writing: res1.data.writing,
                  type: res1.data.type,
                  content: res1.data.content,
                });
                setExamList(arr);
                setCheckbox(res1.data.checkbox);
                setCoding(res1.data.coding);
                setRadio(res1.data.radio);
                setWriting(res1.data.writing);
              }
            });
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, examList]);

  const onSearch = () => {
    console.log("onSearch");
  };

  const handleChallengeUpdate = () => {
    let examIds = [];
    examList.forEach((e) => {
      examIds.push(e._id);
    });
    let body = {
      name: challengeName,
      examids: examIds,
    };
    challengeAPI
      .update(id, body)
      .then(() => {
        openNotification();
        navigate("/test");
      })
      .catch((err) => {
        navigate("/test");
        console.log(err);
      });
  };

  const handleUpdateExam = () => {
    exam.coding = coding;
    exam.checkbox = checkbox;
    exam.radio = radio;
    exam.writing = writing;
    console.log(exam, 111);
    examAPI
      .update(exam._id, exam)
      .then((res) => {
        openNotification(res.message);
        navigate(-1);
      })
      .catch((err) => console.log(err));
  };

  const onHandleChange = (type, value) => {
    switch (type) {
      case "title":
        setExam({ ...exam, title: value });
        break;
      case "challenge-type":
        setExam({ ...exam, challenge_type: value });
        break;
      case "type":
        setExam({ ...exam, type: value });
        break;
      case "content":
        setExam({ ...exam, content: value });
        break;
      case "writing":
        setWriting({ ...writing, result: value });
        break;
      case "radio":
        setRadio({ ...radio, result: value });
        break;
      case "check-box":
        setCheckbox({ ...checkbox, result: value });
        break;
      case "coding":
        setCoding({ ...coding, result: value });
        break;
      default:
        break;
    }
  };
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (notification) => {
    api.open({
      message: "Notification Title",
      description: notification,
      icon: (
        <SmileOutlined
          style={{
            color: "#4caf50",
          }}
        />
      ),
    });
  };

  const onDeleteExam = (id) => {
    let arr = examList;
    arr = arr.filter((item) => item._id !== id);
    setExamList(arr);
  };
  const onSelect = (id) => {
    let e = examList.find((e) => e._id === id);
    console.log(e);
    setExam(e);
    setExam(e);
    setWriting(e.writing);
    setCheckbox(e.checkbox);
    setCoding(e.coding);
    setRadio(e.radio);
  };
  if (!exam) return <>Loading!</>;
  return (
    <div className="exam">
      <div className="left-exam">
        <div className="left-exam-body">
          <div
            className="back-title"
            title="Back to prepage"
            onClick={() => {
              navigate("/test");
            }}
          >
            <LeftOutlined style={{ fontSize: 18 }} />
            Testing
          </div>
          <div className="row">
            <div className="title">Title</div>
            <Input
              className="input-1"
              placeholder="type title"
              value={exam.title}
              onChange={(e) => onHandleChange("title", e.target.value)}
            />
            <div className="title" style={{ width: 120 }}>
              ChallengeType
            </div>
            <Select
              value={exam.challenge_type}
              style={{
                width: 120,
              }}
              onChange={(e) => onHandleChange("challenge-type", e)}
              options={[
                {
                  value: "sql",
                  label: "SQL",
                },
                {
                  value: "algorithm",
                  label: "Algorithm",
                },
                {
                  value: "knowledge",
                  label: "Knowledge",
                },
              ]}
            />
          </div>
          <div className="row">
            <div className="title">Type</div>
            <div className="option">
              <Radio.Group
                onChange={(e) => onHandleChange("type", e.target.value)}
                value={exam.type}
              >
                <Radio key={1} value={"coding"}>
                  Coding
                </Radio>
                <Radio key={2} value={"check_box"}>
                  Check box
                </Radio>
                <Radio key={3} value={"radio"}>
                  Radio
                </Radio>
                <Radio key={4} value={"writing"}>
                  Writing
                </Radio>
              </Radio.Group>
            </div>
          </div>

          <div className="row">
            <div className="title">Content</div>
            <div className="input-2">
              <TextArea
                rows={4}
                onChange={(e) => onHandleChange("content", e.target.value)}
                value={exam.content}
              />
            </div>
          </div>
          {exam.type === "coding" && (
            <CodingItem coding={coding} setCoding={setCoding} />
          )}
          {exam.type === "check_box" && (
            <CheckboxItem checkbox={checkbox} setCheckbox={setCheckbox} />
          )}
          {exam.type === "radio" && (
            <RadioItem radio={radio} setRadio={setRadio} />
          )}
          {exam.type === "writing" && (
            <div className="row" style={{ marginTop: 10 }}>
              <div className="title">Result</div>
              <div className="input-2">
                <TextArea
                  rows={4}
                  value={writing === undefined ? "" : writing.result}
                  onChange={(e) => onHandleChange("writing", e.target.value)}
                />
              </div>
            </div>
          )}
        </div>
        <div className="left-exam-footer">
          <Button prefixCls="create-btn-exam" onClick={handleUpdateExam}>
            UPDATE
          </Button>
        </div>
      </div>

      <div className="right-exam">
        <div className="header-list">
          List
          <Search
            className="search-input"
            placeholder="Enter exam"
            onSearch={onSearch}
            style={{
              width: 350,
            }}
          />
        </div>
        <div className="header-list">
          <span style={{ fontSize: 14 }}>Name</span>
          <Input
            className="input-1"
            placeholder="Challenge Name"
            value={challengeName}
            style={{ width: 350 }}
            onChange={(e) => onHandleChange("challenge-name", e.target.value)}
          />
        </div>
        <div className="challenge-list">
          {examList &&
            examList.map((e) => {
              return (
                <ChallengeTag
                  key={e._id}
                  id={e._id}
                  title={e.title}
                  tag={e.challenge_type}
                  onSelect={onSelect}
                  onDelete={onDeleteExam}
                />
              );
            })}
        </div>
        <div className="challenge-list-footer">
          <Button prefixCls="create-btn-exam" onClick={handleChallengeUpdate}>
            UPDATE
          </Button>
        </div>
      </div>
      {contextHolder}
    </div>
  );
};

export default ExamEditing;
