import React, { useState } from 'react';
import RepositoryDataGrid from '../components/Repository/RepositoryDataGrid';
import RepositoryCreateDialog from '../components/Repository/RepositoryCreateDialog';
import RepositoryUpdateDialog from '../components/Repository/RepositoryUpdateDialog';
import { Button, Box } from '@mui/material';
import type { Repository } from '../components/Repository/Repository.types';

const RepositoryPage: React.FC = () => {
  const [createOpen, setCreateOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selected, setSelected] = useState<Repository | null>(null);

  const handleEdit = (repo: Repository) => {
    setSelected(repo);
    setUpdateOpen(true);
  };

  const handleDelete = (repo: Repository) => {
    setSelected(repo);
    setDeleteOpen(true);
  };

  return (
    <Box p={2}>
      <Button variant="contained" onClick={() => setCreateOpen(true)} sx={{ mb: 2 }}>
        Create Repository
      </Button>
      <RepositoryDataGrid onEdit={handleEdit} onDelete={handleDelete} />
      <RepositoryCreateDialog open={createOpen} onClose={() => setCreateOpen(false)} />
      <RepositoryUpdateDialog open={updateOpen} onClose={() => setUpdateOpen(false)} repository={selected} />
      {/* TODO: Implement DeleteConfirmDialog for repositories */}
    </Box>
  );
};

export default RepositoryPage;
