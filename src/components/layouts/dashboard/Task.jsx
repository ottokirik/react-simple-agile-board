import { CardContent, Typography } from '@material-ui/core';

export const Task = ({ task }) => {
  return (
    <CardContent>
      <Typography color="textPrimary" gutterBottom style={{ fontSize: 18 }}>
        {task.title}
      </Typography>
      <Typography color="textSecondary" gutterBottom>
        {task.description}
      </Typography>
    </CardContent>
  );
};
