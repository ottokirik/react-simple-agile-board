import { Card } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import { Draggable } from 'react-beautiful-dnd';
import { Task } from './Task';

const getItemStyle = (draggableStyle) => ({
  padding: 8,
  marginBottom: 8,
  ...draggableStyle,
});

export const Column = observer(({ section }) => {
  return (
    <div>
      {section?.tasks?.map((task, index) => {
        return (
          <Draggable draggableId={task.id} key={task.id} index={index}>
            {(provided) => {
              return (
                <Card
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  ref={provided.innerRef}
                  style={getItemStyle(provided.draggableProps.style)}
                >
                  <Task task={task} />
                </Card>
              );
            }}
          </Draggable>
        );
      })}
    </div>
  );
});
