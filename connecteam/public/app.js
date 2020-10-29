class App extends React.Component {
  state = {

    team_name: '',
    player_name: '',
    parent_name: '',
    phone1: '',
    textok: '',
    phoneok: '',
    job_name: '',
    job_recs: 0,
    items: [],
    billing: [],
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
  axios['get']('/teams').then(
      (response) => {
          console.log(response.data, 'get data response from messageClick');
          this.setState({
              items: response.data,
              screenToShow: 'Message'
          }
      )
  })
}
billingClick = () => {
  axios['get']('/billing').then(
    (response) => {
        console.log(response.data, 'get data response');
        this.setState({
            billing: response.data,
            screenToShow: 'Billing'
        }
    )
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

addPlayerClick = () => {
  event.preventDefault()
  console.log(this.state.currentItem.team_name)
  axios.post(`/teams`,this.state.currentItem)
  .then(response => {
   this.setState({
     items: response.data,
     screenToShow: 'Team'
   })
  })
  }


addTeamClick = () => {
  axios['get']('/teams').then(
      (response) => {
          console.log(response.data, 'get data response');
          this.setState({
              items: response.data,
              screenToShow: 'AddPlayer'
          }
      )
  })
}


///// this shows the edit form
editTeamClick  = (index) => {
    this.setState({
          currentItem: {...this.state.items[index]},
          screenToShow: 'EditTeam'
    })
}

msgPlayer  = () => {
  event.preventDefault()
  let updateBilling ={}
  //loop through players.  Write a billing record then send an sms
  for(let x=0;x<this.state.items.length;x++){
    updateBilling =
    {
      jobname: this.state.currentItem.job_name,
      target_phone1: this.state.items[x].phone1,
      target_datetime: (new Date().toLocaleString())
    }
    axios.post(`/billing`,updateBilling)
    .then(response => {
      this.setState({
        screenToShow: 'Team',
        job_recs: this.state.items.length
      })
    })

    axios.post(`/sms`,{msg:this.state.currentItem.msgToSend})
    .then(response => {
      this.setState({
        screenToShow: 'Sent'
      })
    }).then(this.teamClick)
  }  //end of loop
}

deleteTeamClick= () => {
 axios.delete(`/teams/${this.state.currentItem.id}`).then(response => {
   this.setState({
     screenToShow: 'Team'
   })
 }).then(this.teamClick)
}

  onInputChange = (event) => {      ///target is supplied by the software - you have to trust the software
     /// this copies all the items.  this is done to separate the state value of items from the function value of items
    this.setState({
      currentItem: {
        ...this.state.currentItem,   // we use expansion notation because it makes the object key available
        [event.target.name] : event.target.value
      }    // technically the  assignment to currentItem is unnecessary.  currentItem would have done the assignment
    })
  }

    render = () => {
      let screen = null;
      switch(this.state.screenToShow){
        case 'Team':
          screen =
            <div>
                <div className = 'playertitle'>
                  <h1 className = 'screen'>Your Players </h1>
                  <a href='#' onClick={this.addTeamClick}>
                    <div className='addbtn'>Add a Player</div>
                  </a>
                </div>
                <div className ='headerContainer'>
                  <div id='teamName' className='headerDetail'>Team Name</div>
                  <div id='playerName' className='headerDetail'>Player Name</div>
                  <div id='parentName'className='headerDetail'>Parent Name</div>
                  <div id='preferredPhone'className='headerDetail'>Preferred Phone</div>
                  <div className='headerDetail'>Text OK</div>
                  <div className='headerDetail'>Phone OK</div>
                </div>
                <ul>
                  {this.state.items.map(
                    (item, index) =>{
                      let playerList= (
                        <a  className="playerContainer" href="#" key={item.id} onClick={()=>{this.editTeamClick(index);}}>
                          <div className='playerElement'>
                             {item['team_name']}
                          </div>
                          <div className='playerElement'>
                             {item.player_name}
                          </div>
                          <div className='playerElement'>
                             {item.parent_name}
                          </div>
                          <div className='playerElement'>
                             {item.phone1}
                          </div>
                          <div className='playerElement'>
                             {item.textok}
                          </div>
                          <div className='playerElement'>
                             {item.phoneok}
                          </div>
                        </a>
                      )
                      return playerList
                    }
                  )}
          </ul>
        </div>
          break;
        case 'Message':
          screen = (
            <div className = 'messaging'>
                <div className = 'playertitle'>
                  <h1 className = 'screen'>Send Messages </h1>
                </div>
                <form onSubmit={this.msgPlayer} className='form'>
                  <div className ='jobname'>
                  <div className = 'jntitle'>Enter Name of Msg</div>
                    <input onChange={this.onInputChange} name="job_name" placeholder='Enter Job Name' type="text" className = 'jnbox'/>
                  </div>
                  <div className ='jobname'>
                  <div className = 'jntitle'>Enter your message</div>
                    <textarea onChange={this.onInputChange} name="msgToSend" rows="4" cols="50" placeholder='Enter 140 char msg here'>
                    </textarea>
                  </div>
                  <input type="submit" className="submsg" value="Send SMS Messages"/>
                </form>
                <div className ='headerContainer'>
                  <div id='teamName' className='headerDetail'>Team Name</div>
                  <div id='playerName' className='headerDetail'>Player Name</div>
                  <div id='parentName'className='headerDetail'>Parent Name</div>
                  <div id='preferredPhone'className='headerDetail'>Preferred Phone</div>
                  <div className='headerDetail'>Text OK</div>
                  <div className='headerDetail'>Phone OK</div>
                </div>
                <ul>
                  {this.state.items.map(
                    (item, index) =>{
                      let msgplayerList= (
                        <div className='playerContainer'>
                          <div className='playerElement'>
                             {item['team_name']}
                          </div>
                          <div className='playerElement'>
                             {item.player_name}
                          </div>
                          <div className='playerElement'>
                             {item.parent_name}
                          </div>
                          <div className='playerElement'>
                             {item.phone1}
                          </div>
                          <div className='playerElement'>
                             {item.textok}
                          </div>
                          <div className='playerElement'>
                             {item.phoneok}
                          </div>
                        </div>
                      )
                      return msgplayerList
                    }
                  )}
          </ul>
        </div>
          )
          break;
          case 'AddPlayer':
            screen = (
              <div>
                <div className="screen">
                <h1 className='editTeam'> Add Player Screen </h1>
                  <div className="editForm">
                   <h3>
                    <form onSubmit={this.addPlayerClick} className='form'>
                      <div className='formlabeltop'>
                        <div className='formlabel'>Team Name</div>
                        <input onChange={this.onInputChange} name="team_name" placeholder='Team Name' type="text"/>
                      </div>
                      <div className='formlabeltop'>
                        <div className='formlabel'>Player Name</div>
                        <input onChange={this.onInputChange} name="player_name" placeholder='Player Name' type="text" /><br/>
                      </div>
                      <div className='formlabeltop'>
                        <div className='formlabel'>Parent Name</div>
                        <input onChange={this.onInputChange} name="parent_name" placeholder='Parent Name' type="text" /><br/>
                      </div>
                      <div className='formlabeltop'>
                        <div className='formlabel'>Phone Number</div>
                        <input onChange={this.onInputChange} name="phone1" placeholder='Phone Number' type="text" /><br/>
                      </div>
                      <div className='formlabeltop'>
                        <div className='formlabel'>Text OK</div>
                        <input onChange={this.onInputChange} name="textok" placeholder='OK to text? y or n' type="text" /><br/>
                      </div>
                      <div className='formlabeltop'>
                        <div className='formlabel'>Phone OK</div>
                        <input onChange={this.onInputChange} name="phoneok" placeholder='OK to Phone? y or n' type="text" /><br/>
                      </div>
                      <input type="submit" className="btn btn-secondary" value="Add Player"/>
                    </form>
                    </h3>
                  </div>
                </div>
              </div>
            )
            break;
        case 'EditTeam':
            screen = <div>
            <div className="editTeam">
            <h1 className='editTeam'> Edit Team Screen </h1>
              <div className="editForm">
               <h3>
                <form onSubmit={this.updateTeamClick} className='form'>
                  <div className='formlabeltop'>
                    <div className='formlabel'>Team Name</div>
                    <input onChange={this.onInputChange} name="team_name" value={this.state.currentItem.team_name} type="text"/>
                  </div>
                  <div className='formlabeltop'>
                    <div className='formlabel'>Player Name</div>
                    <input onChange={this.onInputChange} name="player_name" value={this.state.currentItem.player_name} type="text" /><br/>
                  </div>
                  <div className='formlabeltop'>
                    <div className='formlabel'>Parent Name</div>
                    <input onChange={this.onInputChange} name="parent_name" value={this.state.currentItem.parent_name} type="text" /><br/>
                  </div>
                  <div className='formlabeltop'>
                    <div className='formlabel'>Phone Number</div>
                    <input onChange={this.onInputChange} name="phone1" value={this.state.currentItem.phone1} type="text" /><br/>
                  </div>
                  <div className='formlabeltop'>
                    <div className='formlabel'>Text OK</div>
                    <input onChange={this.onInputChange} name="textok" value={this.state.currentItem.textok} type="text" /><br/>
                  </div>
                  <div className='formlabeltop'>
                    <div className='formlabel'>Phone OK</div>
                    <input onChange={this.onInputChange} name="phoneok" value={this.state.currentItem.phoneok} type="text" /><br/>
                  </div>
                  <input type="submit" className="btn btn-secondary" value="Update Player"/>
                </form>
                </h3>
              </div>
              <a href='#' onClick={this.deleteTeamClick}>  <div className='deletebtn'>Delete Player</div></a>
            </div>
          </div>
            break;
        case 'Billing':
        let totalcost=0
          screen =   <div>
          <h1>Billing Detail</h1>
          <div className ='billingHeaderContainer'>
            <div id='jobname' className='headerDetail'>Job Name</div>
            <div id='playername' className='headerDetail'>Player Name</div>
            <div id='targetPhone' className='headerDetail'>Target Phone</div>
            <div id='datetime'className='headerDetail'>Date</div>
          </div>
            <ul>
              {this.state.billing.map(
                (item, index) =>{
                  totalcost += .05
                  let billingScreen = (
                    <div className="billingContainer" key={item.id}>
                      <div className='billingElement'>
                         {item.jobname}
                      </div>
                      <div className='billingElement'>
                         {item.player_name}
                      </div>
                      <div className='billingElement'>
                         {item.target_phone1}
                      </div>
                      <div className='billingElement'>
                         {item.target_datetime}
                      </div>
                    </div>
                  )
                  return billingScreen
                }
              )}
            </ul>
            <div className = 'totalcost'>
              <div>Total Cost</div>
              <div>${totalcost = totalcost.toFixed(2)}</div>
            </div>
    </div>
            break;
            case 'Sent':
              screen =
                <div>
                    <div className = 'playertitle'>
                      <h1 className = 'screen'>Your Players </h1>
                      <a href='#' onClick={this.addTeamClick}>
                        <div className='addbtn'>Add a Player</div>
                      </a>
                    </div>
                </div>
          default:
      }

        return (
          <div className='container'>
            <nav className="navbar">
              <div className="navbar-nav">
                <a className="nav-item nav-link active" href="#" onClick={()=>{location.reload();}}><h1>ConnecTeam Sports Messaging</h1> </a>
                <a className="nav-item nav-link active" href="#"
                onClick={()=>{this.teamClick();}}><span>Players</span></a>
                <a className="nav-item nav-link" href="#"
                onClick={()=>{this.messageClick();}}><span>Message</span></a>
                <a className="nav-item nav-link" href="#"
                onClick={()=>{this.billingClick();}}><span>Billing Detail</span></a>
              </div>
            </nav>
              {screen}
            <footer>
            <div>
              <ul>
                <li className="list-inline-item">
                  <i className="fab fa-react"></i>
                  <i className="fab fa-html5"></i>
                  <i className="fab fa-js"></i>
                  <i className="fab fa-css3"></i>
                  <i className="fab fa-node-js"></i>
                </li>
              </ul>
            </div>
            </footer>
          </div>
        )
    }
}

ReactDOM.render(
    <App></App>,
    document.querySelector('main')
);
