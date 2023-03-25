import { Space, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DataType } from './interfaces';


export const columns: ColumnsType<DataType> = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render:(_, { type }) => (
        <Tag color={'geekblue'} key={type}>
          {type.toUpperCase()}
        </Tag>
      )
    },
    {
      title: 'START DATE',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'END DATE',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Description',
      key: 'description',
      dataIndex: 'description',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a>Update {record.title}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];


//test data
export const data: DataType[] = [
  {
    key: 1,
    title: 'John Brown',
    type:"hello",
    startDate: new Date('2022-04-01T10:30:00Z'),
    endDate: new Date('2022-04-01T10:30:00Z'),
    description: "hello",
  },
  {
    key: 3,
    title: 'John Brown',
    type:"hello",
    startDate: new Date('2022-04-01T10:30:00Z'),
    endDate: new Date('2022-04-01T10:30:00Z'),
    description: "hello",
  },
  {
    key: 3,
    title: 'John Brown',
    type:"hello",
    startDate: new Date('2022-04-01T10:30:00Z'),
    endDate: new Date('2022-04-01T10:30:00Z'),
    description: "hello",
  },
];