import { useStore } from 'hooks/useStore';
import { observer } from 'mobx-react-lite';

function App() {
  const { users } = useStore();

  console.log(users.toJSON());

  return <div>Работает</div>;
}

export default observer(App);
