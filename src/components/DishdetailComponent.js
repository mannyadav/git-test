import React, { Component } from "react";
import {Card,CardImg,CardText,CardBody,CardTitle,Breadcrumb,BreadcrumbItem,Button,Label,Col,Row,Dropdown,
  DropdownMenu,DropdownItem,DropdownToggle,Modal,ModalHeader,ModalBody} from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Link } from "react-router-dom";

const dateFormat = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "2-digit"
});

function formatDate(dateString) {
  return dateFormat.format(new Date(dateString));
}

function RenderDish({ dish }) {
  return (
    <Card>
      <CardImg width="100%" src={dish.image} alt={dish.name} />
      <CardBody>
        <CardTitle>{dish.name}</CardTitle>
        <CardText>{dish.description}</CardText>
      </CardBody>
    </Card>
  );
}

function RenderComments({ comments }) {
  return comments == null ? (
    <div />
  ) : (
    <div>
      <h4>Comments</h4>
      <ul className="list-unstyled">
        {comments.map(c => {
          return (
            <div key={c.id}>
              <p margin="50px 0">{c.comment}</p>
              <p>
                -- {c.author}, {formatDate(c.date)}
              </p>
            </div>
          );
        })}
      </ul>
    </div>
  );
}

const DishDetail = props => {
  const { dish, comments } = props;
  const breadcrumbs = (
    <div>
      <Breadcrumb>
        <BreadcrumbItem>
          <Link to="/menu">Menu</Link>
        </BreadcrumbItem>
        <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
      </Breadcrumb>
      <div className="col-12">
        <h3>{dish.name}</h3>
        <hr />
      </div>
    </div>
  );
  return dish == null ? (
    <div />
  ) : (
    <div className="container">
      <div className="row">{breadcrumbs}</div>
      <div className="row">
        <div className="col-12 col-md-5 m-1">
          <RenderDish dish={dish} />
        </div>
        <div className="col-12 col-md-5 m-1">
          <RenderComments comments={comments} />
          <CommentForm />
        </div>
      </div>
    </div>
  );
};

const required = val => val && val.length;
const maxLength = len => val => !val || val.length <= len;
const minLength = len => val => val && val.length >= len;

class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
      isDropdownOpen: false,
      rating: null
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.updateRating = this.updateRating.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleModal() {
    this.setState({ isModalOpen: !this.state.isModalOpen, rating: null });
  }

  toggleDropdown() {
    this.setState({ isDropdownOpen: !this.state.isDropdownOpen });
  }

  updateRating(event) {
    this.setState({ rating: event.target.innerText });
  }

  handleSubmit(values) {
    const data = {
      Name: values.name,
      Comment: values.comment,
      Rating: this.state.rating
    };
    console.log(data);
    alert(JSON.stringify(data));
    this.toggleModal();
  }

  render() {
    return (
      <div>
        <Button outline onClick={this.toggleModal}>
          <span className="fa fa-pencil" />
          Submit Comment
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={this.handleSubmit}>
              <Row className="form-group">
                <Col>
                  <Label htmlFor="rating">Rating</Label>
                  <br />
                  <Dropdown
                    isOpen={this.state.isDropdownOpen}
                    toggle={this.toggleDropdown}
                    autosize="false"
                  >
                    <DropdownToggle
                      style={{ width: "100%" }}
                      bsStyle="default"
                      caret
                    >
                      {this.state.rating || "Please select"}
                    </DropdownToggle>
                    <DropdownMenu style={{ width: "100%" }}>
                      <DropdownItem onClick={this.updateRating}>1</DropdownItem>
                      <DropdownItem onClick={this.updateRating}>2</DropdownItem>
                      <DropdownItem onClick={this.updateRating}>3</DropdownItem>
                      <DropdownItem onClick={this.updateRating}>4</DropdownItem>
                      <DropdownItem onClick={this.updateRating}>5</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </Col>
              </Row>
              <Row className="form-group">
                <Col>
                  <Label htmlFor="name">Your Name</Label>
                  <Control.text
                    model=".name"
                    className="form-control"
                    id="name"
                    name="name"
                    validators={{
                      required,
                      minLength: minLength(3),
                      maxLength: maxLength(15)
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".name"
                    show="touched"
                    messages={{
                      required: "Required",
                      minLength: "Must be greater than 2 characters",
                      maxLength: "Must be 15 characters or less"
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Col>
                  <Label htmlFor="comment">Comment</Label>
                  <Control.textarea
                    model=".comment"
                    className="form-control"
                    id="comment"
                    name="comment"
                    rows="6"
                  />
                </Col>
              </Row>
              <Button
                type="submit"
                value="submit"
                color="primary"
                disabled={!this.state.rating}
              >
                Submit
              </Button>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default DishDetail;
