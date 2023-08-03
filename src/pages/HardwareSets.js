import React, { useEffect, useState } from "react";
import axios from "axios";

const HardwareSet = ({hardwareSet, capacity, availability }) => {
  const [quantity, setQuantity] = useState();

  const handleCheckIn = async () => {
    try {
      await axios.patch(`/hardwaresets/${hardwareSet}/checkin`, { quantity });
      setQuantity(0);
      alert('Modifying the Availability. Please Confirm')
      window.location.href = './HardwareSets'
    } catch (error) {
      alert('Invalid Quantity')
      window.location.href = './HardwareSets'
      console.error("Error checking in:", error);
    }
  };

  const handleCheckOut = async () => {
    try {
      await axios.patch(`/hardwaresets/${hardwareSet}/checkout`, { quantity });
      setQuantity(0);
      alert('Modifying the Availability. Please Confirm')
      window.location.href = './HardwareSets'
    } catch (error) {
      alert('Invalid Quantity')
      window.location.href = './HardwareSets'
      console.error("Error checking out:", error);
    }
  };

  return (
    <div>
      <h3>{hardwareSet}</h3>
      <p>Capacity: {capacity}</p>
      <p>Availability: {availability}</p>
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(parseInt(e.target.value))}
      />
      <button onClick={handleCheckIn}>Check In</button>
      <button onClick={handleCheckOut}>Check Out</button>
    </div>
  );
};

const HardwareSets = () => {
  const [hardwareList, setHardwareList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/hardwaresets");
      setHardwareList(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <h2>Hardware Sets</h2>
      {hardwareList.map((hardware) => (
        <HardwareSet
          key={hardware._id}
          hardwareId={hardware._id}
          hardwareSet={hardware.Hardware_Set}
          capacity={hardware.Capacity}
          availability={hardware.Availability}
        />
      ))}
    </div>
  );
};

export default HardwareSets;
