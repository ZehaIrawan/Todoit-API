import React, { useEffect, useState } from 'react';
import api from '../utils/api';

const RocketList = () => {
  const [rocket, setRocket] = useState([]);

  useEffect(() => {
    const custom = async () => {
      let data = await api.fetchRockets();
      setRocket(data);
    };
    custom();
  }, []);

  // console.log(rocket);

  return (
    <div>
      Rocket List
      <ul>
        {rocket.map((r) => (
          <li key={r}>{r}</li>
        ))}
      </ul>
    </div>
  );
};

export default RocketList;
