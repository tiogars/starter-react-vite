import React from 'react';
import { List, ListItem, ListItemText, Typography, CircularProgress } from '@mui/material';
import type { Repository } from './Repository.types';
import { useGetAllRepositoriesQuery } from '../../store/repositoryApi';

const RepositoryList: React.FC = () => {
  const { data, isLoading, error } = useGetAllRepositoriesQuery();

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">Failed to load repositories.</Typography>;

  return (
    <List>
      {Array.isArray(data)
        ? data.map((repo: Repository) => (
            <ListItem key={repo.id} divider>
              <ListItemText
                primary={repo.name}
                secondary={repo.description || repo.url}
              />
            </ListItem>
          ))
        : data && (
            <ListItem key={data.id} divider>
              <ListItemText
                primary={data.name}
                secondary={data.description || data.url}
              />
            </ListItem>
          )}
    </List>
  );
};

export default RepositoryList;
