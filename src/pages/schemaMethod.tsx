import React, { FormEvent, useState } from "react";

//this code currently does nothing. If I have the time will redo the tech demo using the schema and data as intended by the test.

import jsonSchema from "../jsonSchema.json";

interface SchemaFormProps {
  schema: string;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const EventForm = ({ schema, onSubmit }: SchemaFormProps) => {
  const [formData, setFormData] = useState({});

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {schema.map((field) => {})}
      <button type="submit">Submit</button>
    </form>
  );
};

const Table = ({ data, schema }) => {
  return (
    <table>
      <thead>
        <tr>
          {schema.map((field) => (
            <th key={field.name}>{field.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {schema.map((field) => (
              <td key={field.name}>{row[field.name]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const schemaMethod = () => {
  const [data, setData] = useState([]);

  const handleSubmit = async (formData: string) => {
    const response = await axios.post("http://localhost:3001/events", formData);
    setData([...data, response.data]);
  };

  return (
    <div>
      <EventForm schema={jsonSchema} onSubmit={handleSubmit} />
      <Table data={data} schema={jsonSchema} />
    </div>
  );
};

export default schema;
