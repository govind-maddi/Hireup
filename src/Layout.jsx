/* eslint-disable no-unused-vars */
/* layout components */
import Header from "./ParentContComponents/Header";
import Footer from "./ParentContComponents/Footer";
import Body from "./ParentContComponents/Body";
import NotificationContext from "./context/NotificationContext";


function Layout() {
  return (
    /* root div for web app */
    <div>
      {/* first child of root div */}
      <div className="hidden"></div>
      <div>
          <NotificationContext>
          <Body />
          </NotificationContext>
      </div>
    </div>
  );
}

export default Layout;
