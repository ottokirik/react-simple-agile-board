import { apiService } from 'api';
import { types, flow, getParent } from 'mobx-state-tree';
import { User } from './users';

const Task = types.model('Task', {
  id: types.identifier,
  title: types.string,
  description: types.string,
  assignee: types.safeReference(User),
});

const BoardSection = types
  .model('BoardSection', {
    id: types.identifier,
    title: types.string,
    tasks: types.array(Task),
  })
  .actions((self) => {
    return {
      load: flow(function* () {
        const { id: boardID } = getParent(self, 2);
        const { id: status } = self;

        const { tasks } = yield apiService.get(
          `boards/${boardID}/tasks/${status}`
        );

        self.tasks = tasks;
      }),
      afterCreate() {
        self.load();
      },
    };
  });

const Board = types.model('Board', {
  id: types.identifier,
  title: types.string,
  sections: types.array(BoardSection),
});

const BoardStore = types
  .model('BoardStore', {
    boards: types.optional(types.array(Board), []),
    active: types.safeReference(Board), // Visible board
  })
  .views((self) => ({
    get list() {
      return self.boards.map(({ id, title }) => ({ id, title }));
    },
  }))
  .actions((self) => {
    return {
      load: flow(function* () {
        self.boards = yield apiService.get('boards');
        self.active = 'MAIN';
      }),
      afterCreate() {
        self.load();
      },
    };
  });

export { BoardStore };
