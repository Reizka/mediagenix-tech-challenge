import { Space, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DataType } from "./interfaces";

interface ColumnsProps {
  onUpdateEvent: (eventID: string) => void;
  onDeleteEvent: (eventID: string) => void;
}

export const columns = ({ onUpdateEvent, onDeleteEvent }: ColumnsProps): ColumnsType<DataType> => [  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
    render: (_, { type }) => (
      <Tag color={"geekblue"} key={type}>
        {type.toUpperCase()}
      </Tag>
    ),
  },
  {
    title: "START DATE",
    dataIndex: "startDate",
    key: "startDate",
    render: (date) => new Date(date).toLocaleDateString(),
  },
  {
    title: "END DATE",
    dataIndex: "endDate",
    key: "endDate",
    render: (date) => new Date(date).toLocaleDateString(),
  },
  {
    title: "Description",
    key: "description",
    dataIndex: "description",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
         <a onClick={() => onUpdateEvent(record.id)}>Update</a>
        <a onClick={() => onDeleteEvent(record.id)}>Delete</a>
      </Space>
    ),
  },
];

