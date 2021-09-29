import { CardContent, Typography } from '@material-ui/core';
import { User } from 'components/shared/User';

export const Task = ({ task }) => {
  return (
    <CardContent>
      <Typography color="textPrimary" gutterBottom style={{ fontSize: 18 }}>
        {task.title}
      </Typography>
      <Typography color="textSecondary" gutterBottom>
        {task.description}
      </Typography>
      <User user={task.assignee} />
    </CardContent>
  );
};
