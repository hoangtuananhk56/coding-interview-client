import React, { useState, useEffect } from "react";
import { LeftOutlined } from "@ant-design/icons";
import { Button, Input, Pagination, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { FrownOutlined } from "@ant-design/icons";
import TestingItem from "../../../components/exam/examItem";
import examAPI from "../../../http/examAPI";
import "./sql.scss";
import { ChallengeType } from "../../../config/define";
const { Search } = Input;
const SQL = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [exams, setExams] = useState([]);
  const [count, setCount] = useState(0);
  useEffect(() => {
    examAPI.getAll(page, perPage, ChallengeType.SQL).then((res) => {
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
  const onSearch = (e) => {
    if (e === "") {
      examAPI.getAll(page, perPage, ChallengeType.SQL).then((res) => {
        setExams(res.data);
        setCount(res.count);
      });
    } else {
      examAPI
        .search(e, ChallengeType.SQL, page, perPage)
        .then((res) => {
          setExams(res.data);
          setCount(res.count);
        })
        .catch(() => {
          errorNotification("Something wrong, can not search records");
        });
    }
  };
  const [api, contextHolder] = notification.useNotification();
  const errorNotification = (message) => {
    api.open({
      message: "Notification Title",
      description: message,
      icon: (
        <FrownOutlined
          style={{
            color: "#f44336",
          }}
        />
      ),
    });
  };

  return (
    <div className="home">
      <div className="title-1">
        <div className="sql-search">
          <div
            className="title-icon"
            title="Back to prepage"
            onClick={() => {
              navigate(-1);
            }}
          >
            <LeftOutlined />
            SQL
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
              onClick={() => navigate(`/challenge/examcreate/sql`)}
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
      {contextHolder}
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

export default SQL;
