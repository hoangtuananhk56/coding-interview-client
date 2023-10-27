import React, { useState, useEffect } from "react";
import { LeftOutlined } from "@ant-design/icons";
import { Button, Input, Pagination } from "antd";
import { useNavigate } from "react-router-dom";
import TestingItem from "../../../components/exam/examItem";
import examAPI from "../../../http/examAPI";
import "./knowledge.scss";
import { ChallengeType } from "../../../config/define";
const { Search } = Input;

const Knowledge = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const onSearch = (value) => console.log(value);
  const [exams, setExams] = useState([]);
  const [count, setCount] = useState(0);
  useEffect(() => {
    examAPI.getAll(page, perPage, ChallengeType.Knowledge).then((res) => {
      setExams(res.data);
      setCount(res.count);
    });
  }, [page, perPage]);

  const onEdit = (item) => {
    navigate(`/challenge/exam/${item._id}`);
  };

  const onDelete = (id) => {
    navigate("/");
  };
  return (
    <div className="home">
      <div className="title-1">
        <div className="knowledge-search">
          <div
            className="title-icon"
            title="Back to prepage"
            onClick={() => {
              navigate(-1);
            }}
          >
            <LeftOutlined />
            Knowledge
          </div>
          <div className="right-search">
            <Search
              className="search-input"
              placeholder="Enter Candidates"
              onSearch={onSearch}
              style={{
                width: 200,
              }}
            />
            <Button
              prefixCls="create-btn"
              onClick={() => navigate("/challenge/examcreate/knowledge")}
            >
              CREATE
            </Button>
          </div>
        </div>
      </div>
      <div className="my-table">
        {exams &&
          exams.map((e, index) => {
            return (
              <TestingItem
                key={index}
                item={e}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            );
          })}
      </div>
      <Pagination
        className="custom-pagination"
        total={count}
        defaultPageSize={5}
        showLessItems={true}
        pageSizeOptions={["5", "10", "15"]}
        showSizeChanger
        showTotal={(total, range) =>
          `${range[0] >= 0 ? range[0] : 0}-${
            range[1] >= 0 ? range[1] : 0
          } per ${total}`
        }
        onChange={(page, size) => {
          setPage(page);
          setPerPage(size);
        }}
      />
    </div>
  );
};

export default Knowledge;
