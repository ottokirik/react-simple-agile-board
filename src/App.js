import { Dashboard } from 'components/layouts/dashboard';
import { observer } from 'mobx-react-lite';

function App() {
  return (
    <main>
      <Dashboard />
    </main>
  );
}

export default observer(App);
