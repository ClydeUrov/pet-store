import Loader from "../../components/Loader/Loader";
import { Suspense } from "react";
import css from "./AdminPage.module.scss";
import { ConstantsProvider} from "../../helpers/routs/ConstantsProvider";
import LeftSide from "../../components/AdminFolder/LeftSide/LeftSide";
import { Outlet } from "react-router-dom";

const AdminPage = () => {
  return (
    <ConstantsProvider>
      <div className={css.container}>
        <LeftSide />

        <div>
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </ConstantsProvider>
  );
};

export default AdminPage;
