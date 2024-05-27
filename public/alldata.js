
function AllData(){
  const [data, setData] = React.useState('');

  React.useEffect(() => {
    var uid = '';
    firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/v8/firebase.User
    uid = user.uid;
    
    // ...
  } else {
    // User is signed out
    // ...
  }
});
    //fetch all accounts from API
    fetch(`/account/all`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setData(JSON.stringify(data));
      });
  }, []);
  return (
    <>
    <h5>All Data in Store:</h5>
    {data}
    </>
  );
}
