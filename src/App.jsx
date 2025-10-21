import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { 
  Box, 
  Container, 
  Typography, 
  TextField, 
  Button, 
  AppBar, 
  Toolbar,
  Paper,
  Stack
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import HomeIcon from '@mui/icons-material/Home'
import TableChartIcon from '@mui/icons-material/TableChart'
import './App.css'

// Sample page with form using react-hook-form
function FormPage() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [submittedData, setSubmittedData] = useState(null)

  const onSubmit = (data) => {
    setSubmittedData(data)
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          React Hook Form Example
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <TextField
              {...register('name', { required: 'Name is required' })}
              label="Name"
              error={!!errors.name}
              helperText={errors.name?.message}
              fullWidth
            />
            <TextField
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              label="Email"
              error={!!errors.email}
              helperText={errors.email?.message}
              fullWidth
            />
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Stack>
        </form>
        {submittedData && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6">Submitted Data:</Typography>
            <Typography>Name: {submittedData.name}</Typography>
            <Typography>Email: {submittedData.email}</Typography>
          </Box>
        )}
      </Paper>
    </Container>
  )
}

// Sample page with DataGrid
function DataGridPage() {
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'firstName', headerName: 'First name', width: 150 },
    { field: 'lastName', headerName: 'Last name', width: 150 },
    { field: 'age', headerName: 'Age', type: 'number', width: 110 },
  ]

  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: 28 },
  ]

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        MUI X DataGrid Example
      </Typography>
      <Paper elevation={3} sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Paper>
    </Container>
  )
}

function App() {
  return (
    <Router>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <HomeIcon sx={{ mr: 2 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              React Vite Starter
            </Typography>
            <Button color="inherit" component={Link} to="/">
              Form
            </Button>
            <Button color="inherit" component={Link} to="/datagrid" startIcon={<TableChartIcon />}>
              DataGrid
            </Button>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/" element={<FormPage />} />
          <Route path="/datagrid" element={<DataGridPage />} />
        </Routes>
      </Box>
    </Router>
  )
}

export default App
