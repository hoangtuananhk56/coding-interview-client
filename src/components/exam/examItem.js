import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "./examitem.scss";

const TestingItem = ({ onEdit, onDelete, item }) => {
  return (
    <div className="item-component" key={item.id}>
      <div className="left-item">
        <p className="item-title">{item.title}</p>
      </div>
      <div className="right-item">
        <EditOutlined className="item-icon" onClick={() => onEdit(item)} />
        <DeleteOutlined
          className="item-icon"
          onClick={() => onDelete(item.id)}
        />
      </div>
    </div>
  );
};

export default TestingItem;
