
function AllData(){
  const [data, setData] = React.useState('');
  const [stack, setStack] = React.useState();
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

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
            console.log(Object.values(data[1])[5])
            setIsAdmin(true);
            let newData = [];
            data.forEach(acct => newData.push(Object.values(acct).slice(2)));

            console.log(newData)
            setData(newData);
            setStack(
              <div>
                {newData.map((items, index) => {
                  return (
                    <div key={Math.random(10)} style={{display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)", borderTop: "1px solid grey"}}>
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

  const auth  = firebase.auth();
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      let uid = await user.uid;
      fetch(`/account/all/${uid}/`)
        .then(response => response.json())
        .then(data => {
          console.log(data.isAdmin)
          if(Boolean(data.isAdmin) === true){
            console.log("IS ADMIN")
            loadAdmin(stack);
          }else{
            return (
              <>
                <Message
                bgcolor="danger"
                status={status}
                body={
                  <>
                    <h5>Not an admin</h5>
                  </>
                }/>
              </>
            );
          }
        })
        .catch(rejected =>{
          console.log(rejected);
        })
    }
  })
}

function loadAdmin(stack){
  console.log("TRYING TO LOAD")
  return (
              <>
                <DataContainer
                  bgcolor="light"
                  header="All account data"
                  body=
                    {stack}
                />
              </>
            );
}

function Error(props){
  return(<>
    <h5>Error</h5>
    <p>{props.errorMessage}</p>
  </>);
}