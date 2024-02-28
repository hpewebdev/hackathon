import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';

const EmployeeForm = () => {
  const [employeeIds, setEmployeeIds] = useState(['', '', '', '']);
  const { control, handleSubmit } = useForm();
  const apiUrl = 'https://10.64.29.214:8080/api/emp'; // Replace with your actual API endpoint

  const fetchEmployeeData = async (id, index) => {
    try {
      const response = await fetch(`${apiUrl}?employeeId=${id}`);
      const data = await response.json();

      // Update the specific employee's data
      const updatedEmployeeIds = [...employeeIds];
      updatedEmployeeIds[index] = data.id; // Assuming the API response has an 'id' field
      setEmployeeIds(updatedEmployeeIds);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const onSubmit = (data) => {
    // Handle form submission if needed
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {employeeIds.map((id, index) => (
        <div key={index}>
          <Controller
            name={`employeeName${index}`}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Employee Name"
                variant="outlined"
                fullWidth
                disabled
              />
            )}
          />
          {/* Similar fields for email and project group */}
          <Button
            variant="contained"
            color="primary"
            onClick={() => fetchEmployeeData(id, index)}
          >
            Load
          </Button>
        </div>
      ))}
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default EmployeeForm;
