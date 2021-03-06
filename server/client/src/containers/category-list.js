import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col, Container, ListGroup, Form, Button, FormControl, Dropdown } from "react-bootstrap";
import { fetchCategories, updateCategory, deleteCategory, updateSites }  from '../actions/index';


class CategoryList extends React.Component {

  constructor(props) {
    super(props);


    this.renderCategories = this.renderCategories.bind(this);
    this.renderSites = this.renderSites.bind(this);
    this.submitBudget = this.submitBudget.bind(this);
    this.clearBudget = this.clearBudget.bind(this);
    this.removeCategory = this.removeCategory.bind(this);

    this.input = React.createRef();
  }

  componentDidMount() {
    this.props.fetchCategories();
 }


 submitBudget(budgetNumber, categoryId, event) {
  event.preventDefault();

  const firstFunction = async () => {
    await this.props.updateCategory(categoryId, null, budgetNumber)
    console.log("we should fetch categories now")
    this.props.fetchCategories();
  }

  firstFunction();

}

clearBudget(categoryId, event) {
  event.preventDefault();

  const firstFunction = async () => {
    await this.props.updateCategory(categoryId, null, "CLEAR")
    console.log("we should fetch categories now")
    this.props.fetchCategories();
  }

  firstFunction();
}

removeCategory(categoryId, event) {
  event.preventDefault();

  const firstFunction = async () => {
    await this.props.updateSites(null, null, categoryId);
    secondFunction();
  }

  const secondFunction = async () => {
    await this.props.deleteCategory(categoryId);
    this.props.fetchCategories();
  }

  firstFunction();
}


 renderSites(site) {
   return(
    <ListGroup.Item>{site}</ListGroup.Item>
   );
 }


  renderCategories(categoryData) {

    if(categoryData.name !== "(Uncategorized)") {
      if(!categoryData.maxVisits) {

      return (
        <ListGroup.Item className="list-group-item list-group-item-warning">
          <Row>
            <Col md={2}><h5>{categoryData.name} </h5></Col>
            <Col md={2}><h5>{categoryData.maxVisits}</h5></Col>
            <Col md={5} className="d-block"><ListGroup variant="flush">{categoryData.sites.map(this.renderSites)}</ListGroup></Col>
            <Col md={3}>
              <Row>
                <Col className="d-flex">
     
                  <Dropdown>
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Set Budget
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item 
                          onClick={event => this.submitBudget(50, categoryData._id, event)}>
                          50
                        </Dropdown.Item>
                        <Dropdown.Item 
                          onClick={event => this.submitBudget(100, categoryData._id, event)}>
                          100
                        </Dropdown.Item>
                        <Dropdown.Item 
                          onClick={event => this.submitBudget(500, categoryData._id, event)}>
                          500
                        </Dropdown.Item>
                        <Dropdown.Item 
                          onClick={event => this.submitBudget(1000, categoryData._id, event)}>
                          1000
                        </Dropdown.Item>
                        <Dropdown.Item 
                          onClick={event => this.submitBudget(2000, categoryData._id, event)}>
                          2000
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown> 
                      <Button variant="warning" onClick={(e) => this.clearBudget(categoryData._id, e)}>
                          Clear Budget
                      </Button>
                  </Dropdown>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col>
                  <Dropdown>
                    <Button variant="danger" onClick={(e) => this.removeCategory(categoryData._id, e)}>
                    Remove Category
                    </Button>
                  </Dropdown>
              </Col>
            </Row>
          </Col>
        </Row>
      </ListGroup.Item>
      )

      } else {
        return (
        <ListGroup.Item >
        <Row>
          <Col md={2}><h5>{categoryData.name} </h5></Col>
          <Col md={2}><h5>{categoryData.maxVisits}</h5></Col>
          <Col md={5} className="d-block"><ListGroup variant="flush">{categoryData.sites.map(this.renderSites)}</ListGroup></Col>
          <Col md={3}>
              <Row>
                <Col className="d-flex">
     
                  <Dropdown>
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Set Budget
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item 
                          onClick={event => this.submitBudget(50, categoryData._id, event)}>
                          50
                        </Dropdown.Item>
                        <Dropdown.Item 
                          onClick={event => this.submitBudget(100, categoryData._id, event)}>
                          100
                        </Dropdown.Item>
                        <Dropdown.Item 
                          onClick={event => this.submitBudget(500, categoryData._id, event)}>
                          500
                        </Dropdown.Item>
                        <Dropdown.Item 
                          onClick={event => this.submitBudget(1000, categoryData._id, event)}>
                          1000
                        </Dropdown.Item>
                        <Dropdown.Item 
                          onClick={event => this.submitBudget(2000, categoryData._id, event)}>
                          2000
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown> 
                      <Button variant="warning" onClick={(e) => this.clearBudget(categoryData._id, e)}>
                          Clear Budget
                      </Button>
                  </Dropdown>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col>
                  <Dropdown>
                    <Button variant="danger" onClick={(e) => this.removeCategory(categoryData._id, e)}>
                        Remove Category
                    </Button>
                  </Dropdown>
              </Col>
            </Row>
          </Col>
        </Row>
      </ListGroup.Item>
    )
      }
    }
  }

    render() {
      return (
        <div>
          <br />
          <Row>
          <Col md={8}><h2>My Budgets</h2></Col>
              
          <Col md={4}></Col>
          </Row>
          <br />
          <ListGroup>
            <ListGroup.Item>
              <Row>
                <Col md={2}><h3>Category</h3></Col>
                <Col md={2}><h3>Budget</h3></Col>
                <Col md={5}><h3>Sites</h3></Col>
                <Col md={3}><h3>Actions</h3></Col>
              </Row>
            </ListGroup.Item>
            {this.props.categories.map(this.renderCategories)}
          </ListGroup>
        </div>
      );
    }

}

function mapStateToProps(state) {
  return { categories: state.categoryData }; 
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchCategories, updateCategory, deleteCategory, updateSites }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);