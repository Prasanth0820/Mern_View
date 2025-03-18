import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import axios from 'axios';
import navlogo from './images/navlogo.png';

const Form = ({ update, onreload, setSearchQuery, searchQuery }) => {
  const [UserName, setUserName] = useState('');
  const [Description, setDescription] = useState('');
  const [Duration, setDuration] = useState('');

  useEffect(() => {
    if (update) {
      setUserName(update.UserName);
      setDescription(update.Description);
      setDuration(update.Duration);
    } else {
      setUserName('');
      setDescription('');
      setDuration('');
    }
  }, [update]);

  const postingdata = async (e) => {
    e.preventDefault();
    if (update) {
      await axios.put(`https://prasanth0820.github.io/Mern_Project/put/data/${update._id}`, { UserName, Description, Duration });
      Swal.fire({
        icon: "success",
        text: "Data Updated Successfully",
      });
      setUserName('');
      setDescription('');
      setDuration('');
    } else {
      await axios.post("https://prasanth0820.github.io/Mern_Project//post/data", { UserName, Description, Duration });
      setUserName('');
      setDescription('');
      setDuration('');
      Swal.fire({
        icon: "success",
        text: "Data Added Successfully",
      });
    }
    onreload();
  };

  return (
    <div>
      <nav className="navbar .bg-light " style={{ padding: "25px", position: "sticky", top: "0", zIndex: "100" }} id='navbar'>
        <div className="container-fluid">
          <img src={navlogo} alt='logo' style={{ width: '80px', height: '60px' }} />
          <form className="d-flex col-4" style={{ marginLeft: "auto" }}>
            {/* Navbar search input */}
            <input
              className="form-control me-4 px-5"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchQuery} // Bind to searchQuery state
              onChange={(e) => setSearchQuery(e.target.value)} // Update the search query on change
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </nav>
      <div className="container">
        <div className="centered-form">
          <h2 className="text-center">GYM MANAGEMENT</h2>
          <form onSubmit={postingdata}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                value={UserName}
                id="name"
                placeholder="Enter name"
                required
                onChange={(event) => setUserName(event.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                id="description"
                rows="4"
                required
                value={Description}
                placeholder="Enter description"
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Duration (Min)</label>
              <input
                type="number"
                className="form-control"
                id="duration"
                value={Duration}
                required
                placeholder="Enter duration"
                onChange={(event) => setDuration(event.target.value)}
              />
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
