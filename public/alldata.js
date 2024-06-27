
function AllData(){
  const [data, setData] = React.useState('');

  React.useEffect(() => {
    var uid = '';
    const auth  = firebase.auth();
    const user = firebase.auth().currentUser;
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        // User is signed in
        uid = await user.uid;

        //fetch all accounts from API
        fetch(`/account/all/${uid}/`)
          .then(response => response.json())
          .then(data => {
            console.log(data);
            setData(JSON.stringify(data));
          })
          .catch(rejected =>{
            console.log(rejected);
          })
      } else {
      }
    })
  }, []);
  return (
    <>
    <h5>All Data in Store:</h5>
    {data}
    </>
  );
}
