import React, { useState, useEffect } from "react";
import Fuse from "fuse.js";

import {
  useQuery,
  useMutation,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import axios from "axios";
import dayjs from "dayjs";

import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { SearchOutlined } from "@ant-design/icons";
import { Space, Table, Button, Input } from "antd";
const { Search } = Input;
import { columns } from "../tableSchema/columnsType";
import { CreateEventModalForm } from "./createModal";

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

// Search function that uses Axios to get data
async function searchEvents(query: string) {
  const response = await axios.get("http://localhost:3001/events");
  if (response.status !== 200) {
    throw new Error("An error occurred while fetching events");
  }

  // create a new instance of Fuse
  const fuse = new Fuse(response.data, {
    keys: ["title", "description"], // specify the keys to search
    includeScore: true, // include the score in the search results
    threshold: 0.4, // set the threshold to control the level of fuzziness
  });

  // perform the search and return the results
  return query
    ? fuse.search(query).map((result) => result.item)
    : response.data;
}

export default function Home() {
  //table state for the view
  const [tableData, setTableData] = useState([]);

  const [isUpdate, setIsUpdate] = useState(false);
  const [updateData, setUpdateData] = useState({
    id: "",
    title: "",
    type: "",
    startDate: dayjs(),
    endDate: dayjs(),
    description: "T",
  });

  //GET DATA
  const { isLoading, isError, data, error } = getEvents();

  const col = columns;

  //UPDATE/DELETE single event by getting a callback from ColumsType.tsx which is embedded into ants Table
  const onUpdateEvent = (eventID: string) => {
    const tData = tableData.find((event) => event.id === eventID);
    if (tData !== undefined) {
      console.log("Update event with:", tData);
      setIsUpdate(true);
      setIsModalOpen(true);
      setUpdateData({
        ...tData,
        startDate: dayjs(tData.startDate),
        endDate: dayjs(tData.endDate),
      });
    } else {
      console.error("could not find correct event");
    }
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

  //SEARCH
  const [searchQuery, setSearchQuery] = useState("");

  const {
    isLoading: isLoadingSearch,
    isError: isSearchErro,
    data: searchData,
    error: searchError,
  } = useSearchEvents(searchQuery);

  const onSearch = (value: string) => {
    setSearchQuery(value);
  };

  // React Query hook to handle caching and error handling for the search results
  function useSearchEvents(query: string) {
    return useQuery(["events", query], async () => {
      const data = await searchEvents(query);
      console.log(data);
      return data;
    });
  }

  // MODAL
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setIsUpdate(false);
  };

  useEffect(() => {
    if (searchQuery) {
      setTableData(searchData);
    } else if (data) {
      setTableData(data);
    }
  }, [data, searchData, searchQuery]);

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
        <CreateEventModalForm
          isUpdate={isUpdate}
          isOpen={isModalOpen}
          onCancel={handleCancel}
          updateData={updateData}
        />
      </main>
    </>
  );
}
