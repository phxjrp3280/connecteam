class App extends React.Component {
  state = {

    team_name: '',
    player_name: '',
    parent_name: '',
    phone1: '',
    textok: '',
    phoneok: '',
    bill_amt: '',
    items: [],
    screenToShow: ''
}

teamClick = () => {
    axios['get']('/teams').then(
        (response) => {
            console.log(response.data, 'get data response');
            this.setState({
                items: response.data,
                screenToShow: 'Team'
            }
        )
    })
}
messageClick = () => {
    this.setState({
        screenToShow: 'Message'
    })
}
billingClick = () => {
    this.setState({
        screenToShow: 'Billing'
    })
}




// UPDATE Team Information
 updateTeamClick = () => {
   event.preventDefault()
   console.log('in update team' , this.state.currentItem)
   axios.put(`/teams/${this.state.currentItem.id}`,this.state.currentItem)
  .then(response => {
    this.setState({
      items: response.data,
      screenToShow: 'Team'
    })
  })
}


///// this shows the edit form
editTeamClick  = (index) => {
    this.setState({
          currentItem: {...this.state.items[index]},
          screenToShow: 'EditTeam'
    })
}

deleteTeamClick= () => {
 axios.delete(`/teams/${this.state.currentItem.id}`).then(response => {
   this.setState({
     screenToShow: 'Team'
   })
 }).then(this.teamClick)
}
//

// const address {
//   street: '7735 N. 12th Ave',
//   city: 'Phoenix',
//   state: 'AZ',
//   zip: 85021,
//   [key]: 'glendale'
// }


  onInputChange = (event) => {      ///target is supplied by the software - you have to trust the software
     /// this copies all the items.  this is done to separate the state value of items from the function value of items
    this.setState({
      currentItem: {
        ...this.state.currentItem,   // we use expansion notation because it makes the object key available
        [event.target.name] : event.target.value
      }    // technically the  assignment to currentItem is unnecessary.  currentItem would have done the assignment
    })
  }

  onClickHandler = () => {
      this.getdata();
  }



    render = () => {
      let screen = null;
      switch(this.state.screenToShow){
        case 'Team':

          screen = <div>
                <h1> Teams Screen </h1>
                <ul>
                  {this.state.items.map(
                    (item, index) =>{
                      return(
                        <a href="#" key={item.id} onClick={()=>{this.editTeamClick(index);}}>
                           <div>
                             {item['team_name']}{' '}
                             {item.player_name}{' '}
                             {item.parent_name}{' '}
                             {item.phone1}{' '}
                             {item.textok}{' '}
                             {item.phoneok}{' '}
                           </div>
                        </a>
                      )
                    }
                  )}
          </ul>
        </div>
          break;
        case 'Message':
          screen = (<h1> Messaging Screen </h1>)
          break;
        case 'EditTeam':
            screen = <div>
            <h1> Edit Team Screen </h1>
            <div className="CreateItem">
              <div className="card-body">
                <form onSubmit={this.updateTeamClick}>
                  <input onChange={this.onInputChange} name="team_name" value={this.state.currentItem.team_name} type="text"/><br/>
                  <input onChange={this.onInputChange} name="player_name" value={this.state.currentItem.player_name} type="text" /><br/>
                  <input onChange={this.onInputChange} name="parent_name" value={this.state.currentItem.parent_name} type="text" /><br/>
                  <input onChange={this.onInputChange} name="phone1" value={this.state.currentItem.phone1} type="text" /><br/>
                  <input onChange={this.onInputChange} name="textok" value={this.state.currentItem.textok} type="text" /><br/>
                  <input onChange={this.onInputChange} name="phoneok" value={this.state.currentItem.phoneok} type="text" /><br/>
                  <input type="submit" class="btn btn-secondary" value="Update Player"/>
                </form>
              </div>
              <a href='#' onClick={this.deleteTeamClick}>  <div className='deletebtn'>Delete Player</div></a>
            </div>
          </div>


            break;
        case 'Billing':
          screen = (<h1>Billing Screen </h1>)
            break;
          default:
      }

        return <div className="Inventory-container">


                    <nav className="navbar fixed-top bg-custom-2 navbar-expand-lg navbar-light bg-light">
                      <div className="navbar-nav">
                        <a className="nav-item nav-link active" href="#" onClick={()=>{location.reload();}}><h5>ConnecTeam</h5> </a>
                        <a className="nav-item nav-link active" href="#"
                        onClick={()=>{this.teamClick();}}><span>Teams</span></a>
                        <a className="nav-item nav-link" href="#"
                        onClick={()=>{this.messageClick();}}><span>Message</span></a>
                        <a className="nav-item nav-link" href="#"
                        onClick={()=>{this.billingClick();}}><span>Billing Detail</span></a>
                      </div>
                    </nav>

                      {screen}

                </div>


    }
}

ReactDOM.render(
    <App></App>,
    document.querySelector('main')
);
