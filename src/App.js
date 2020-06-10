//importing required dependecies
import React, { Component } from "react";
import ReactTable from "react-table";
import "./App.css";
import "react-table/react-table.css";
import moment from "moment";

// Main App Class
class App extends Component {
  // Creating array object for response
  state = {
    summary: [],
    stats: {},
    loading: false,
  };

  componentDidMount() {
    this.getSummary();
    
  }
  getSummary = async () => {
    this.setState({ loading: true });
    // Api Call
    await fetch("https://api.covid19api.com/summary")
    
      // get response as JSON object
      .then((res) => res.json())
      .then((data) => {
        // assign json data to summary array
        this.setState({ summary: data.Countries });
      })
      .catch(console.log);
    this.setState({ loading: false });
  };

  getStats = async () => {
    this.setState({ loading: true });
    // Api Call
    await fetch("https://api.covid19api.com/stats")
      // get response as JSON object
      .then((res) => res.json())
      .then((data) => {
        // assign json data to summary aray
        this.setState({ stats: data });
      })
      .catch(console.log);
    this.setState({ loading: false });
  };

  // Render The application
  render() {
    // Defining Column for Table
    const { stats, summary } = this.state;
    console.log(this.state.stats);
    const columns = [
      {
        Header: "Country",
        accessor: "Country",
      },
      {
        Header: "New Confirmed",
        accessor: "NewConfirmed",
      },
      {
        Header: "Total Confirmed",
        accessor: "TotalConfirmed",
      },
      {
        Header: "New Deaths",
        accessor: "NewDeaths",
      },
      {
        Header: "Total Deaths",
        accessor: "TotalDeaths",
      },
      {
        Header: "New Recovered",
        accessor: "NewRecovered",
      },
      {
        Header: "Total Recovered",
        accessor: "TotalRecovered",
      },
      {
        Header: "Date",
        accessor: "Date",
      },
    ];

    return (
      <div className="container">
        <div className="col-xs-12">
          <h1>Covid-19 Summary</h1>
          <div className="d-flex">
            <button onClick={() => this.getSummary()}>Refresh</button>
            <button onClick={() => this.getStats()}>View Stats</button>
          </div>
          {this.state.loading && <h6>Loading .........</h6>}
          {/* Draw Table */}
          <ReactTable
            data={summary}
            columns={columns}
            defaultPageSize={10}
            pageSizeOptions={[10, 20]}
          />
        </div>
        {!this.state.stats.All ? (
          "loading"
        ) : (
          <div className="card">
            <div className="d-flex">
              <h6>Total: </h6>
              {stats.Total}
            </div>
            <hr />
            <div className="d-flex">
              <h6>All: </h6>
              {stats.All}
            </div>
            <hr />

            {/*  */}
            <div className="d-flex">
              <h6>All Updated: </h6>
              {stats.AllUpdated}
            </div>
            <hr />

            <div className="d-flex">
              <h6>Countries: </h6>
              {stats.Countries}
            </div>
            <hr />
            <div className="d-flex">
              <h6>CountriesUpdated: </h6>
              {stats.CountriesUpdated}
            </div>
            <hr />

            <div className="d-flex">
              <h6>By Country: </h6>
              {stats.ByCountry}
            </div>
            <hr />

            <div className="d-flex">
              <h6>Stats: </h6>
              {stats.Stats}
            </div>
            <hr />

            <div className="d-flex">
              <h6>Summary: </h6>
              {stats.Summary}
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default App;
