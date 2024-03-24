import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectStatus({dataOptions, dataSelected ,setDataSelected, label }) {

  const handleChange = (event) => {
    setDataSelected(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={dataSelected}
          label={label}
          onChange={handleChange}
          size='small'
          sx={{mb: 2}}
        >
        {dataOptions?.map((option)=>(
            <MenuItem key={option?.id} value={option?.value}>{option?.name}</MenuItem>
        ))} 
        </Select>
      </FormControl>
    </Box>
  );
}
