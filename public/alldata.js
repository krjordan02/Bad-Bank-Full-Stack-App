
function AllData(){
  const [data, setData] = React.useState('');
  const [stack, setStack] = React.useState();
  const [isAdmin, setIsAdmin] = React.useState(false);

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
            console.log(data.isAdmin)
            setIsAdmin(false);
            let newData = [];
            data.forEach(acct => newData.push(Object.values(acct).slice(2)));

            console.log(newData)
            setData(newData);
            setStack(
              <div>
                {newData.map((items, index) => {
                  return (
                    <div style={{display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)", borderTop: "1px solid grey"}}>
                      {items.map((subItems, sIndex) => {
                        return <div style={{padding: "10px"}}> {subItems} </div>;
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
  if(isAdmin === false){
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
}

function AccountData(props){
  let data = props.data;
  console.log(data[0].name)

}

function Error(props){
  return(<>
    <h5>Error</h5>
    <p>{props.errorMessage}</p>
  </>);
}