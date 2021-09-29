import { types, flow } from 'mobx-state-tree';
import { apiService } from 'api';

export const User = types.model('User', {
  id: types.identifier,
  createdAt: types.string,
  name: types.string,
  avatar: types.string,
});

const ActiveUser = User.named('ActiveUser');

const UsersStore = types
  .model('UsersStore', {
    users: types.maybe(types.array(User)),
    me: types.maybe(ActiveUser),
  })
  .views((self) => {
    return {
      get list() {
        return self.users?.map(({ id, name }) => ({ id, name }));
      },
    };
  })
  .actions((self) => {
    return {
      load: flow(function* () {
        self.users = yield apiService.get('users');
        self.me = yield apiService.get('me');
      }),
      afterCreate() {
        self.load();
      },
    };
  });

export { UsersStore };
