import { AppHeader } from "../app-header/app-header";
import styles from "./app.module.css";

const App = () => {
  return (
    <div className={styles.page}>
      <AppHeader></AppHeader>
    </div>
  );
};

export default App;
