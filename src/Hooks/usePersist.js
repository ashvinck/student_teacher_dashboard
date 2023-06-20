import { useEffect, useState } from 'react';

const usePersist = () => {
  // Initialize the persist state with the value retrieved from local storage,
  // or use a default value of false if no persisted value is found
  const [persist, setPersist] = useState(
    JSON.parse(localStorage.getItem('persist')) || false
  );

  // Update the persisted value in local storage whenever the persist state changes
  useEffect(() => {
    localStorage.setItem('persist', JSON.stringify(persist));
  }, [persist]);

  // Return the persist state and the function to update it
  return [persist, setPersist];
};

export default usePersist;
