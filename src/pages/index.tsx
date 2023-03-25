import React, { useState } from "react";

import Head from "next/head";
import Image from "next/image";

import styles from "@/styles/Home.module.css";
import { SearchOutlined } from "@ant-design/icons";
import {
  Space,
  Table,
  Button,
  Modal,
  DatePicker,
  Form,
  Input,
  Select,
} from "antd";
const { TextArea, Search } = Input;

import { columns, data } from "../tableSchema/columnsType";

const onSearch = (value: string) => console.log(value);

//Modal fields
interface Values {
  title: string;
  type: string;
  description: string;
  startDate: Date;
  endDate: Date;
}

interface CreateEventModalForm {
  isOpen: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
}

const CreateEventModalForm: React.FC<CreateEventModalForm> = ({
  isOpen,
  onCreate,
  onCancel,
}) => {
  const [form] = Form.useForm();
  return (
    <Modal
      title="Create Event"
      open={isOpen}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
      okText="Save"
      onCancel={onCancel}
    >
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        initialValues={{ size: "default" }}
        style={{ maxWidth: 600 }}
      >
        <Form.Item
          label="Title"
          rules={[{ required: true, message: "Please input title" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Type"
          rules={[{ required: true, message: "Please select a type" }]}
        >
          <Select>
            <Select.Option value="generic">Generic event</Select.Option>
            <Select.Option value="holiday">Holiday</Select.Option>
            <Select.Option value="competitor_event">
              Competitor event
            </Select.Option>
            <Select.Option value="content_launch">Content launch</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Start Date"
          rules={[{ required: true, message: "Please select a start date" }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          label="End Date"
          rules={[{ required: true, message: "Please select an end date" }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item label="Description">
          <TextArea rows={4} placeholder="maxLength is 140" maxLength={140} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default function Home() {
  const col = columns;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleCreate = (values: any) => {
    console.log("Success:", values);
  };

  const onCreateFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Meadiagenix tech test - react" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Space direction="vertical" size="middle">
          <Space>
            <Search
              placeholder="input search text"
              onSearch={onSearch}
              enterButton
            />
            <Button onClick={showModal}>Create event</Button>
          </Space>
          <Table columns={col} dataSource={data} />
        </Space>
        <CreateEventModalForm
          isOpen={isModalOpen}
          onCreate={handleCreate}
          onCancel={handleCancel}
        />
      </main>
    </>
  );
}
