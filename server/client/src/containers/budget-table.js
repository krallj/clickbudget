import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col, Container, Table} from 'react-bootstrap';
import { fetchSites, fetchCategories } from '../actions/index';
 

class BudgetTable extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      records: [],
      recordLoaded: false,
    }


    this.createRecords = this.createRecords.bind(this)
    this.renderBudget = this.renderBudget.bind(this);
  }

  componentDidMount() {

    const firstFetchSites = async () => {
      await this.props.fetchSites();
      thenFetchCategories();
    }

    const thenFetchCategories = async () => {
      await this.props.fetchCategories();
      this.createRecords();
    }

    firstFetchSites();

  }

 

   createRecords() {
      let records = [];

      this.props.categoryCountArray.forEach((categoryCount) => {

          let recordObject = {};
          recordObject["name"] = categoryCount.name;
          recordObject["visits"] = categoryCount.count;

          records.push(recordObject);
      })

      this.setState({records: records})
      this.setState({recordLoaded: true})
    }

    renderBudget(budgetData) {
      if (!this.state.recordLoaded) {
        return <tr>
        </tr>
      } else {

     if (budgetData.maxVisits !== null) {
        let matchingRecord = this.state.records.filter(record => record.name === budgetData.name)
        if (matchingRecord[0]) {
          if(budgetData.maxVisits < matchingRecord[0].visits) {
            return (
              <tr className="table-danger">
                <td>{budgetData.name}</td>
                <td>{budgetData.maxVisits}</td>
                <td>{matchingRecord[0].visits}</td>
                <td >{budgetData.maxVisits - matchingRecord[0].visits}</td>
              </tr>
              )
          }
          // The normal one
          else {
            return (
              <tr>
                <td>{budgetData.name}</td>
                <td>{budgetData.maxVisits}</td>
                <td>{matchingRecord[0].visits}</td>
                <td>{budgetData.maxVisits - matchingRecord[0].visits}</td>
              </tr>
              )
          }
          }
        }
      }
    };

    render() {

        return (
        <Table striped bordered hover size="sm">
          <thead>
          <tr>
              <th>Category</th>
              <th>Budget</th>
              <th>Visits</th>
              <th>+/-</th>
            </tr>
          </thead>
          <tbody>
            {this.props.categories.map(this.renderBudget)}
          </tbody>
        </Table>
        );

    }

  }

    function mapStateToProps(state) {

      return { sites: state.siteData.sites, 
        totalVisitCount: state.siteData.totalVisitCount, 
        categoryCountArray: state.siteData.categoryCountArray,
        categories: state.categoryData }; 
    }
    
    function mapDispatchToProps(dispatch) {
      return bindActionCreators({ fetchSites, fetchCategories }, dispatch);
    }
    
    export default connect(mapStateToProps, mapDispatchToProps)(BudgetTable);