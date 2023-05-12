
import AttendanceTracker from "../components/AttendanceTracker";
import { useAuth } from "../context/AuthProvider";

const Home = () => {
  const { user } = useAuth();

  return <div>You are logged in and your email address is {user.email}
  <AttendanceTracker />
  </div>;
};

export default Home;