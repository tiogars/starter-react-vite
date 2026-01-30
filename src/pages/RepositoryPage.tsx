import React, { useState } from 'react';
import RepositoryList from '../components/Repository';
import RepositoryCreateDialog from '../components/Repository/RepositoryCreateDialog';
import RepositoryUpdateDialog from '../components/Repository/RepositoryUpdateDialog';
import { Button, Box } from '@mui/material';
import type { Repository } from '../components/Repository/Repository.types';

const RepositoryPage: React.FC = () => {
  const [createOpen, setCreateOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [selected] = useState<Repository | null>(null);

  // For demo, you would add edit/delete actions to RepositoryList and pass setSelected/setUpdateOpen

  return (
    <Box p={2}>
      <Button variant="contained" onClick={() => setCreateOpen(true)} sx={{ mb: 2 }}>
        Create Repository
      </Button>
      <RepositoryList />
      <RepositoryCreateDialog open={createOpen} onClose={() => setCreateOpen(false)} />
      <RepositoryUpdateDialog open={updateOpen} onClose={() => setUpdateOpen(false)} repository={selected} />
    </Box>
  );
};

export default RepositoryPage;
