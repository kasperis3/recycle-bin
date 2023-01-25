import './App.css';
import React, { useState } from 'react';

function App() {
  
  let url1 = {url: "asdf.example.com", urlID: "1sdf4w3"}; 
  let url2 = {url: "gfhgfh.example.com", urlID: "3333"}; 
  let url3 = {url: "htt.example.com", urlID: "4444"};
  let urlItems = [url1, url2, url3];

  let requests = ["request1", "request2", "request3"];

  const [activeURL, setActiveURL] = useState("")
  const [currentRequests, setRequests] = useState(["request1", "request2", "request3"])
  const [currentRequest, setCurrentRequest] = useState(["info 1", "info 2", "info 3"])

  const selectURL = (id) => {
    console.log("selected url!", activeURL);
    // query database to get an array of request items associated with activeURL
    // setRequests([array of request items])
    if (activeURL == "1sdf4w3") {
      setRequests(["request4", "request5", "request6"]);
    } else if (activeURL == "3333") {
      setRequests(["request7", "request8", "request9"]);
    } else {
      setRequests(["request1", "request2", "request3"]);
    }
    setActiveURL(id)
  }

  const selectRequest = (id) => {
    console.log("selected request", id);
    setCurrentRequest("Body of " + id + " goes here")
    // query noSQL database to get body associated with current request selected

  }
  
  
  return (
    <div>
      <header>
        <h1>RecycleBin</h1>
      </header>
      <body>
        <div className="row">
          <div className="left"><UrlList urls={urlItems} activeURL={activeURL} selectURL={selectURL} /></div>
          <div className="middle"><RequestList requests={currentRequests} currentRequest={currentRequest} selectRequest={selectRequest} /></div>
          <div className="right"><RequestBody requestInfo={currentRequest}/></div>
        </div>
      </body>
    </div>
  );
}

const UrlList = (props) => {
  return (<div>
    <p>List for URLs</p>
    <ul>
      {props.urls.map(function(obj, index) {
        return <UrlItem obj={obj} index={index} selectURL={props.selectURL} activeURL={props.activeURL}/>
      })}
    </ul>
    </div>); // Iterate through array of URL items, display key components of each one 
}

function UrlItem(props) {
  return (<li index={props.index} onClick={() => props.selectURL(props.obj.urlID)}>
    {props.obj.url}
    </li>); // Display each url item
}

function RequestList(props) {
  return (<div>
    <p>List for Requests</p>
    <ul>
      {props.requests.map(function(name, index) {
        return <RequestItem name={name} index={index} selectRequest={props.selectRequest} currentRequest={props.currentRequest} />
      })}
    </ul>
    </div>); // Iterate through array of request items, display key components of each one 
}

function RequestItem(props) {
  return (<li index={props.index} onClick={() => props.selectRequest(props.name)}>
    {props.name}
    </li>); // Display each request item
}

function RequestBody(props) {
  return (<div>
    <p>Body of Request</p>
    {props.requestInfo}
  </div>); // display body of request 
}

export default App;
