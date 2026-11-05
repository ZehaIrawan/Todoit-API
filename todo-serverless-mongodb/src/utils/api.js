const fetchRockets = async () => {
  let res = await fetch(`.netlify/functions/rocket`);
  let result = await res.json();
  return result;
};


export default {
  fetchRockets
};
