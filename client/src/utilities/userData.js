function getUserData(){
  return JSON.parse(localStorage.getItem('userData'));
}

function setUserData(data){
  localStorage.setItem('userData', data);
}

export {
  getUserData,
  setUserData
}