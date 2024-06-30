
function AllData(){
  const [stack, setStack] = React.useState();

  React.useEffect(() => {
    var uid = '';
    const auth  = firebase.auth();
    const user = firebase.auth().currentUser;
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        // User is signed in
        uid = await user.uid;

        //fetch all accounts from API
        fetch(`/account/all/allData/`)
          .then(response => response.json())
          .then(data => {
            let newData = [];
            data.forEach(acct => newData.push(Object.values(acct).slice(2)));
            setStack(
              <div>
                {newData.map((items, index) => {
                  return (
                    <div key={Math.random(10)} style={{display: "grid", 
                    gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)", 
                    borderTop: "1px solid grey"}}>
                      {items.map((subItems, sIndex) => {
                        return <div style={{padding: "10px"}} key={Math.random(10)}> {subItems} </div>;
                      })}
                    </div>
                  );
                })}
              </div>
            )
          })
          .catch(rejected =>{
            console.log(rejected);
          })
      } else {
      }
    })
  }, []);

  return(
    <>
      <DataContainer
        bgcolor="light"
        header="All account data"
        body=
          {stack}
      />
    </>
  )
}