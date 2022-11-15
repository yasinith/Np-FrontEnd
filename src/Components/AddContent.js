import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { useLocation } from "react-router-dom";

function AddContent() {
  const limit = 10;
  const [getcourse, setgetcourse] = useState("");
  const [courseTopic, setCourseTopic] = useState("");

  const id = new URLSearchParams(useLocation().search).get("id");
  console.log(id);

  const addContent = () => {
    axios
      .post(`http://http://npbackend-env.eba-5vh5vmtw.us-east-1.elasticbeanstalk.com/api/v1/title/addTitle`, {
        titleName: courseTopic,
        course: { id: id },
      })
      .then(() => {
        console.log("Success");
        alert("Topic added successed!");
        window.location.reload(false);
      });
  };

  const Getcourse = async () => {
    try {
      const res = await fetch(
        `http://http://npbackend-env.eba-5vh5vmtw.us-east-1.elasticbeanstalk.com/api/v1/course/course/${id}`
      );
      const data = await res.json();

      setgetcourse(data.courseTitle);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    Getcourse();
  }, [limit]);

  return (
    <div>
      <div>
        <Navbar />
        <br />
      </div>
      <div className="container card">
        <div className="card-header">
          <h1>Add Topics for {getcourse}</h1>
        </div>
        <div className="card-body">
          <form>
            <div className="form-group">
              <br />
              <label for="exampleFormControlInput1 p-2">Topic Name</label>
              <br />

              <input
                onChange={(event) => {
                  setCourseTopic(event.target.value);
                }}
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder=""
              />
            </div>
            <br />

            <div className="form-group">
              <br></br>
            </div>
            <button className="btn btn-primary m-2" onClick={addContent}>
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddContent;
