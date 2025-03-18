import React, { useEffect, useState } from 'react';
import Form from './Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Swal from 'sweetalert2';
const Views = () => {
  const [alldata, setAlldata] = useState([]);
  const [update, setUpdate] = useState(null);
  const [checkedItems, setCheckedItems] = useState({});
  const [searchQuery, setSearchQuery] = useState('');  // State to track search query

  // Fetch data from the backend
  const gettingdata = async () => {
    await axios.get("https://mern-project-ml86.onrender.com/get/data/").then((data) => setAlldata(data.data));
  };

  // Delete an element
  
  const deletingdata = 
  async (params) => {
    try {
      await axios.delete(`https://mern-project-ml86.onrender.com/get/data/${params}`);
      gettingdata();
    } catch (error) {
      console.error(error);
    }
      Swal.fire({
            icon: "success",
            text: "Data Deleted Successfully",
          });
  };

  // Edit an element
  const editingdata = async (part) => {
    setUpdate(part);
  };

  // Fetch data when the component mounts
  useEffect(() => {
    gettingdata();
  }, []);

  // Handle checkbox state changes
  const handleCheckboxChange = (id) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Filter data based on search query
  const filteredData = alldata.filter(item => {
    const query = searchQuery.toLowerCase();
    return (
      item.UserName.toLowerCase().includes(query) ||
      item.Description.toLowerCase().includes(query) ||
      item.Duration.toString().includes(query) // Convert Duration to string for comparison
    );
  });

  return (
    <div>
      <Form update={update} onreload={() => { setUpdate(null); gettingdata(); }} setSearchQuery={setSearchQuery} searchQuery={searchQuery} />

      <h2 className='formspace'>User Details</h2>

      <div className="container">
        <ul className="responsive-table">
          <li className="table-header">
            <div className="col col-1">PRO</div>
            <div className="col col-1">Name</div>
            <div className="col col-2">Description</div>
            <div className="col col-3">Duration</div>
            <div className="col col-4">Actions</div>
          </li>
        </ul>
      </div>

      {filteredData.length > 0 ? (
        filteredData.map((display, index) => (
          <div key={index} className="container">
            <ul className="responsive-table">
              <li className="table-row">
                <div className="form-check col col-1">
                  <input
                    className="form-check-input px-3 py-3"
                    type="checkbox"
                    value=""
                    id={`checkbox-${display._id}`}
                    onChange={() => handleCheckboxChange(display._id)} // Handle checkbox change
                  />
                </div>
                <div
                  className={`col col-1 py-2 ${checkedItems[display._id] ? 'struck-through' : ''}`}
                  data-label="Name"
                >
                  {display.UserName}
                </div>
                <div
                  className={`col col-2 py-2 ${checkedItems[display._id] ? 'struck-through' : ''}`}
                  data-label="Description"
                >
                  {display.Description}
                </div>
                <div
                  className={`col col-3 py-2 ${checkedItems[display._id] ? 'struck-through' : ''}`}
                  data-label="Duration"
                >
                  {display.Duration}
                </div>
                <div className="col col-4 py-2" data-label="Actions" id='btns'>
                  <button
                    type="button"
                    className="edit-button py-2"
                    onClick={() => editingdata(display)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="delete-button py-2"
                    onClick={() => deletingdata(display._id)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            </ul>
          </div>
        ))
      ) : (
        <div style={{textAlign:'center'}}> OPPS!!! <br></br> NO RECORDS FOUND</div>
      )}
    </div>
  );
};

export default Views;
