import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  IconButton,
  Chip,
  Alert,
  AlertTitle,
} from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import {
  ArrowBack,
  ArrowForward,
  TrendingUp,
  TrendingDown,
  People,
  ShoppingCart,
} from '@mui/icons-material';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { ThemeShowcaseProps } from './ThemeShowcase.types';

// Sample data for charts
const chartData = [
  { month: 'Jan', sales: 4000, revenue: 2400, users: 240 },
  { month: 'Feb', sales: 3000, revenue: 1398, users: 221 },
  { month: 'Mar', sales: 2000, revenue: 9800, users: 229 },
  { month: 'Apr', sales: 2780, revenue: 3908, users: 200 },
  { month: 'May', sales: 1890, revenue: 4800, users: 218 },
  { month: 'Jun', sales: 2390, revenue: 3800, users: 250 },
];

// Sample data for DataGrid
const dataGridRows = [
  { id: 1, name: 'Product A', category: 'Electronics', price: 299.99, stock: 45, status: 'Active' },
  { id: 2, name: 'Product B', category: 'Clothing', price: 49.99, stock: 120, status: 'Active' },
  { id: 3, name: 'Product C', category: 'Food', price: 12.99, stock: 0, status: 'Inactive' },
  { id: 4, name: 'Product D', category: 'Electronics', price: 799.99, stock: 15, status: 'Active' },
  { id: 5, name: 'Product E', category: 'Books', price: 19.99, stock: 80, status: 'Active' },
];

const dataGridColumns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Product Name', width: 180 },
  { field: 'category', headerName: 'Category', width: 130 },
  { field: 'price', headerName: 'Price ($)', type: 'number', width: 120 },
  { field: 'stock', headerName: 'Stock', type: 'number', width: 100 },
  {
    field: 'status',
    headerName: 'Status',
    width: 120,
    renderCell: (params) => (
      <Chip
        label={params.value}
        color={params.value === 'Active' ? 'success' : 'default'}
        size="small"
      />
    ),
  },
];

// Sample carousel items
const carouselItems = [
  { id: 1, title: 'Welcome to Theme Showcase', description: 'Explore the variety of UI components' },
  { id: 2, title: 'Data Visualization', description: 'Interactive charts and graphs' },
  { id: 3, title: 'Form Elements', description: 'Beautiful and functional forms' },
];

export const ThemeShowcase = (props: ThemeShowcaseProps) => {
  const { themeVariant = 'switchable' } = props;
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    subscribe: false,
  });

  const handleCarouselPrev = () => {
    setCarouselIndex((prev) => (prev === 0 ? carouselItems.length - 1 : prev - 1));
  };

  const handleCarouselNext = () => {
    setCarouselIndex((prev) => (prev === carouselItems.length - 1 ? 0 : prev + 1));
  };

  const handleFormChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const getThemeLabel = () => {
    if (themeVariant === 'light-only') return 'Light Only (Professional Blue)';
    if (themeVariant === 'dark-only') return 'Dark Only (Midnight Purple)';
    return 'Switchable (Current)';
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" gutterBottom>
          Theme Showcase
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Current Theme: <strong>{getThemeLabel()}</strong>
        </Typography>
      </Box>

      {/* Carousel Section */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Carousel Component
          </Typography>
          <Box
            sx={{
              position: 'relative',
              height: 250,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'action.hover',
              borderRadius: 2,
              my: 2,
            }}
          >
            <IconButton
              onClick={handleCarouselPrev}
              sx={{ position: 'absolute', left: 16 }}
            >
              <ArrowBack />
            </IconButton>
            <Box sx={{ textAlign: 'center', px: 8 }}>
              <Typography variant="h4" gutterBottom>
                {carouselItems[carouselIndex].title}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {carouselItems[carouselIndex].description}
              </Typography>
            </Box>
            <IconButton
              onClick={handleCarouselNext}
              sx={{ position: 'absolute', right: 16 }}
            >
              <ArrowForward />
            </IconButton>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
            {carouselItems.map((item) => (
              <Box
                key={item.id}
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  bgcolor: item.id - 1 === carouselIndex ? 'primary.main' : 'action.disabled',
                  transition: 'all 0.3s',
                }}
              />
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* Dashboard Cards with Graphics */}
      <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
        Dashboard Cards with Graphics
      </Typography>
      <Stack spacing={3} sx={{ mb: 4 }}>
        {/* Metric Cards */}
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
          <Box sx={{ flex: 1 }}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <People sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                  <Box>
                    <Typography color="text.secondary" variant="body2">
                      Total Users
                    </Typography>
                    <Typography variant="h4">1,248</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', color: 'success.main' }}>
                  <TrendingUp sx={{ mr: 0.5 }} />
                  <Typography variant="body2">+12.5% from last month</Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>

          <Box sx={{ flex: 1 }}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <ShoppingCart sx={{ fontSize: 40, color: 'secondary.main', mr: 2 }} />
                  <Box>
                    <Typography color="text.secondary" variant="body2">
                      Total Sales
                    </Typography>
                    <Typography variant="h4">$45,890</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', color: 'error.main' }}>
                  <TrendingDown sx={{ mr: 0.5 }} />
                  <Typography variant="body2">-3.2% from last month</Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>

          <Box sx={{ flex: 1 }}>
            <Card>
              <CardContent>
                <Typography color="text.secondary" variant="body2" gutterBottom>
                  Conversion Rate
                </Typography>
                <Typography variant="h4" gutterBottom>
                  3.48%
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', color: 'success.main' }}>
                  <TrendingUp sx={{ mr: 0.5 }} />
                  <Typography variant="body2">+0.8% from last month</Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Stack>

        {/* Charts */}
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
          <Box sx={{ flex: 1 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Sales Trends
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="sales" stroke="#1976d2" strokeWidth={2} />
                    <Line type="monotone" dataKey="revenue" stroke="#dc004e" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Box>

          <Box sx={{ flex: 1 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  User Growth
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="users" fill="#1976d2" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Box>
        </Stack>
      </Stack>

      {/* Form Section */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Form Elements
          </Typography>
          <Alert severity="info" sx={{ mb: 3 }}>
            <AlertTitle>Information</AlertTitle>
            Fill out the form below to see how form elements look in this theme.
          </Alert>
          <Stack spacing={3}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
              <TextField
                fullWidth
                label="Full Name"
                variant="outlined"
                value={formData.name}
                onChange={(e) => handleFormChange('name', e.target.value)}
              />
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                variant="outlined"
                value={formData.email}
                onChange={(e) => handleFormChange('email', e.target.value)}
              />
            </Stack>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={formData.category}
                  label="Category"
                  onChange={(e) => handleFormChange('category', e.target.value)}
                >
                  <MenuItem value="electronics">Electronics</MenuItem>
                  <MenuItem value="clothing">Clothing</MenuItem>
                  <MenuItem value="food">Food</MenuItem>
                  <MenuItem value="books">Books</MenuItem>
                </Select>
              </FormControl>
              <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.subscribe}
                      onChange={(e) => handleFormChange('subscribe', e.target.checked)}
                    />
                  }
                  label="Subscribe to newsletter"
                />
              </Box>
            </Stack>
            <TextField
              fullWidth
              label="Comments"
              multiline
              rows={4}
              variant="outlined"
            />
            <Box>
              <Button variant="contained" color="primary" sx={{ mr: 2 }}>
                Submit
              </Button>
              <Button variant="outlined" color="secondary">
                Cancel
              </Button>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {/* DataGrid Section */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            DataGrid Component
          </Typography>
          <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={dataGridRows}
              columns={dataGridColumns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
              disableRowSelectionOnClick
            />
          </Box>
        </CardContent>
      </Card>

      {/* Table Section */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Table Component
          </Typography>
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Order Date</TableCell>
                  <TableCell align="right">Amount</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>#1001</TableCell>
                  <TableCell>John Smith</TableCell>
                  <TableCell>2026-01-05</TableCell>
                  <TableCell align="right">$250.00</TableCell>
                  <TableCell>
                    <Chip label="Completed" color="success" size="small" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>#1002</TableCell>
                  <TableCell>Sarah Johnson</TableCell>
                  <TableCell>2026-01-08</TableCell>
                  <TableCell align="right">$180.50</TableCell>
                  <TableCell>
                    <Chip label="Pending" color="warning" size="small" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>#1003</TableCell>
                  <TableCell>Michael Brown</TableCell>
                  <TableCell>2026-01-10</TableCell>
                  <TableCell align="right">$420.75</TableCell>
                  <TableCell>
                    <Chip label="Completed" color="success" size="small" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>#1004</TableCell>
                  <TableCell>Emma Davis</TableCell>
                  <TableCell>2026-01-11</TableCell>
                  <TableCell align="right">$95.00</TableCell>
                  <TableCell>
                    <Chip label="Cancelled" color="error" size="small" />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Text Section with 3 Paragraphs */}
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Typography Showcase
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, 
            nisl eget ultricies aliquam, quam nisl aliquet nunc, vitae aliquam nisl 
            nunc vitae nisl. Sed euismod, nisl eget ultricies aliquam, quam nisl aliquet 
            nunc, vitae aliquam nisl nunc vitae nisl. Pellentesque habitant morbi tristique 
            senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, 
            feugiat vitae, ultricies eget, tempor sit amet, ante.
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. 
            Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper 
            pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit 
            amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum 
            rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis 
            pulvinar facilisis.
          </Typography>
          <Typography variant="body1">
            Ut velit mauris, egestas sed, gravida nec, ornare ut, mi. Aenean ut orci vel 
            massa suscipit pulvinar. Nulla sollicitudin. Fusce varius, ligula non tempus 
            aliquam, nunc turpis ullamcorper nibh, in tempus sapien eros vitae ligula. 
            Pellentesque rhoncus nunc et augue. Integer id felis. Curabitur aliquet 
            pellentesque diam. Integer quis metus vitae elit lobortis egestas.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ThemeShowcase;
