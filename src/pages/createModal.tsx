import { useMutation, useQueryClient } from '@tanstack/react-query'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'

import {
  Modal,
  DatePicker,
  Form,
  Input,
  Select,
} from "antd";

const { TextArea } = Input;

interface CreateEventModalForm {
  isOpen: boolean;
  onCancel: () => void;
  event?: Event;
  setData?:any;
}

interface Event {
    id: string;
    title: string;
    type: string;
    startDate: string;
    endDate: string;
    description: string;
  }

export const CreateEventModalForm: React.FC<CreateEventModalForm> = ({
  isOpen,
  onCancel,
  event,
  setData
  
}) => {
  const [form] = Form.useForm();

  const queryClient = useQueryClient();

  const createEvent = async (event: Omit<Event, "id">) => {
    const response = await axios.get("http://localhost:3001/events");

    const events = response.data;
    const newEvent = { ...event, id: uuidv4() };

    const postResponse = await axios.post("http://localhost:3001/events", newEvent);
    if (postResponse.status !== 201) {
      throw new Error("An error occurred while creating the event");
    }
    queryClient.setQueryData<Event[]>(["events"], (oldEvents = []) => [
      ...oldEvents,
      postResponse.data,
    ]);
    return postResponse.data;
  };

  //add error and isLoading handling if I have the time...
  const { mutate, isLoading, isError, error } = useMutation(createEvent);

  const handleCreate = (value: Event) => {
    console.log("Success:", value);
    mutate(value);
  };

  return (
    <Modal
      title="Create Event"
      open={isOpen}
      onOk={() => {
        form
          .validateFields()
          .then((values: Event) => {
            form.resetFields();
            handleCreate(values);
          })
          .catch((info: any) => {
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
          name="title"
          rules={[{ required: true, message: "Please input title" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Type"
          name="type"
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
          name="startDate"
          rules={[{ required: true, message: "Please select a start date" }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          label="End Date"
          name="endDate"
          rules={[{ required: true, message: "Please select an end date" }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <TextArea rows={4} placeholder="maxLength is 140" maxLength={140} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
