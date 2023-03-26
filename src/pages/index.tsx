import React, { useState, useEffect } from "react";
import { useQuery, useMutation, QueryClient,QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";

import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { SearchOutlined } from "@ant-design/icons";
import { Space, Table, Button, Input } from "antd";
const { Search } = Input;
import { columns } from "../tableSchema/columnsType";
import { CreateEventModalForm } from "./createModal";

const onSearch = (value: string) => console.log(value);
const queryClient = new QueryClient();

// REACT QUERY /*/

function getEvents() {
  const { isLoading, isError, data, error } = useQuery(
    ["events"], // wrap the query key in an array
    async () => {
      const response = await axios.get("http://localhost:3001/events");
      if (response.status !== 200) {
        throw new Error("An error occurred while fetching events");
      }
      return response.data;
    }
  );

  return {
    isLoading,
    isError,
    data,
    error,
  };
}

async function deleteEvent(eventId: string) {
  const response = await axios.delete(
    `http://localhost:3001/events/${eventId}`
  );

  if (response.status !== 200) {
    throw new Error("An error occurred while deleting the event");
  }

  return response.data;
}

export default function Home() {
  
  const [tableData, setTableData] = useState([]);
  //GET DATA
  const { isLoading, isError, data, error } = getEvents();

  useEffect(() => {
    if (data) {
      setTableData(data);
    }
  }, [data, setTableData]);

  const col = columns;

  //UPDATE/DELETE single event by getting a callback from ColumsType.tsx which is embedded into ants Table
  const onUpdateEvent = (eventID: string) => {
    console.log("Update event with ID:", eventID);
  };

  // Mutation for deleting an event
  const deleteEventMutation = useMutation(deleteEvent, {
    onSuccess: () => {
      queryClient.invalidateQueries(["events"]);
    },
  });

  const onDeleteEvent = (eventId: string) => {
    const newData = tableData.filter((event) => event.id !== eventId);
    setTableData(newData);
    deleteEventMutation.mutate(eventId);
  };

  // MODAL
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
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
          {isError && error instanceof Error && (
            <div>Error: {error.message}</div>
          )}
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <Table
              columns={col({ onUpdateEvent, onDeleteEvent })}
              dataSource={tableData}
            />
          )}
        </Space>
        <CreateEventModalForm isOpen={isModalOpen} onCancel={handleCancel} setData={setTableData}/>
      </main>
      </>
  );
}
