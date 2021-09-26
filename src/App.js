import { useStore } from 'hooks/useStore';
import { observer } from 'mobx-react-lite';

function App() {
  const { users, boards } = useStore();

  // console.log('users', users.toJSON());
  console.log('boards', boards.active?.toJSON());

  return <div>Работает</div>;
}

export default observer(App);
