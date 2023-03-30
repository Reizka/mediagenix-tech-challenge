import React, { FormEvent, useState } from "react";

interface SchemaFormProps {
  schema: string;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const SchemaForm = ({ schema, onSubmit }: SchemaFormProps) => {
  const handleChange = (name, value) => {
    //setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {schema.map((field) => {
        // Render form fields based on the "component" property
        // Implement validation based on the "required" property
      })}
      <button type="submit">Submit</button>
    </form>
  );
};
