import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  Button,
} from '@material-ui/core';
import { useStore } from 'hooks/useStore';
import { observer } from 'mobx-react-lite';
import { useCallback, useState } from 'react';

export const NewTaskForm = observer(
  ({ isOpen, handleClose = () => {}, sectionId }) => {
    const { users, boards } = useStore();
    const [taskState, setTaskState] = useState();

    const updateTaskState = useCallback(
      (event) => {
        const { name, value } = event.target;

        setTaskState((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      },
      [setTaskState]
    );

    const addNewTask = useCallback(
      (event) => {
        event.preventDefault();

        boards.active.addTask(sectionId, taskState);
        handleClose();
      },
      [taskState, boards, sectionId, handleClose]
    );

    return (
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>Creating new task</DialogTitle>
        <form onSubmit={addNewTask}>
          <DialogContent style={{ minWidth: 500 }}>
            <Box p={1}>
              <TextField
                fullWidth
                required
                type="text"
                name="title"
                label="Title"
                onChange={updateTaskState}
                value={taskState?.title || ''}
              />
            </Box>
            <Box p={1}>
              <TextField
                required
                fullWidth
                type="text"
                multiline
                name="description"
                label="Description"
                onChange={updateTaskState}
                maxRows={Infinity}
                value={taskState?.description || ''}
              />
            </Box>
            <Box p={1}>
              <FormControl fullWidth>
                <InputLabel shrink>Assignee</InputLabel>
                <Select
                  required
                  style={{
                    width: '100%',
                  }}
                  native
                  name="assignee"
                  value={taskState?.assignee || ''}
                  onChange={updateTaskState}
                >
                  <option value={''} disabled>
                    –
                  </option>
                  {users.list?.map((user) => {
                    return (
                      <option key={user.id} value={user.id}>
                        {user.name}
                      </option>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
            <Button type="submit" color="primary">
              Create
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
);
