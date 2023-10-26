import { LeftOutlined, SmileOutlined } from "@ant-design/icons";
import { Button, Input, Radio, Select, notification } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CheckboxItem from "../../../components/testing/CheckboxItem";
import CodingItem from "../../../components/testing/CodingItem";
import RadioItem from "../../../components/testing/RadioItem";
import examAPI from "../../../http/examAPI";
import "./exam_item.scss";
const { TextArea } = Input;

const ExamItem = () => {
  const navigate = useNavigate();
  const { id } = useParams();

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
      ischeck: false,
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
    examAPI.getbyId(id).then((res) => {
      setExam({
        id: res.data._id,
        title: res.data.title,
        challenge_type: res.data.challenge_type,
        checkbox: res.data.checkbox,
        coding: res.data.coding,
        radio: res.data.radio,
        writing: res.data.writing,
        type: res.data.type,
        content: res.data.content,
      });
      setCheckbox(res.data.checkbox);
      setCoding(res.data.coding);
      setRadio(res.data.radio);
      setWriting(res.data.writing);
    });
  }, [id]);

  const handleUpdateExam = () => {
    exam.coding = coding;
    exam.checkbox = checkbox;
    exam.radio = radio;
    exam.writing = writing;
    examAPI
      .update(id, exam)
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
      case "challenge-name":
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

  return (
    <div className="exam-item">
      <div className="left-exam">
        <div className="left-exam-body">
          <div
            className="back-title"
            onClick={() => {
              navigate(-1);
            }}
          >
            <LeftOutlined style={{ fontSize: 18 }} />
            Exam content
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
              onChange={(e) => onHandleChange("challenge-name", e)}
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

      {contextHolder}
    </div>
  );
};

export default ExamItem;
