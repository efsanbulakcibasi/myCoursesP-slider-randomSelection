import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Courses from "./Courses";
import Loading from "./Loading";

function App() {
  const [courses, setCourses] = useState([]);
  const [loading, setLading] = useState(false);

  const fetchData = async () => {
    setLading(true);

    try {
      const response = await axios.get(" http://localhost:3004/courses");
      setCourses(response.data);
      setLading(false);
    } catch (error) {
      setLading(false);
    }
  };

  const deleteCourse = async (id) => {
    const newList = courses.filter((x) => x.id !== id);
    setCourses(newList);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="App">
      <h1>Kurslarım</h1>
      {loading ? (
        <Loading />
      ) : (
        <div>
        {
          courses.length === 0 ? 
          <div className="empty-list">
            <h3>Hiç kurs kalmadı</h3>
            <button className="emptyL-btn"
            onClick={() => {
              fetchData()
            }}
            >Yenile</button>
          </div> 
          : 
          <Courses removeCourse={deleteCourse} courses={courses} />

        }
        </div>
      )}
    </div>
  );
}

export default App;
