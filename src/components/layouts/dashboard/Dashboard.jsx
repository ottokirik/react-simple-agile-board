import { Box, Button, Grid, Paper, Typography } from '@material-ui/core';
import { useStore } from 'hooks/useStore';
import { observer } from 'mobx-react-lite';
import { useCallback, useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Column } from './Column';
import { NewTaskForm } from './NewTaskForm';

const getListStyle = (isDraggingOver) => ({
  backgroundColor: isDraggingOver ? 'lightblue' : 'lightgray',
  padding: 8,
  minHeight: 500,
});

const Dashboard = observer(() => {
  const { boards } = useStore();
  const [addNewTask, setAddNewTask] = useState(null);

  const closeDialog = useCallback(() => {
    setAddNewTask(null);
  }, [setAddNewTask]);

  const onDragEnd = useCallback(
    (event) => {
      const { source, destination, draggableId: taskId } = event;

      boards.active.moveTask({ taskId, source, destination });
    },
    [boards]
  );

  return (
    <Box p={2}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Grid container spacing={3}>
          {boards.active?.sections.map((section) => {
            return (
              <Grid item key={section.id} xs>
                <Paper>
                  <Box
                    p={1}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography variant="h5">{section?.title}</Typography>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => setAddNewTask(section.id)}
                    >
                      Add task
                    </Button>
                  </Box>
                  <Droppable droppableId={section.id}>
                    {(provided, snapshot) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                      >
                        <Column section={section} />
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </DragDropContext>
      <NewTaskForm
        isOpen={!!addNewTask}
        handleClose={closeDialog}
        sectionId={addNewTask}
      />
    </Box>
  );
});

export { Dashboard };
