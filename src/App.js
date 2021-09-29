import { Dashboard } from 'components/layouts/dashboard';
import { Header } from 'components/layouts/header/Header';
import { observer } from 'mobx-react-lite';

function App() {
  return (
    <>
      <Header />
      <main>
        <Dashboard />
      </main>
    </>
  );
}

export default observer(App);
