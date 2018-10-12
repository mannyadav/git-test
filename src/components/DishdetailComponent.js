import React, {Component} from 'react';
import {Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle} from 'reactstrap';

class DishDetail extends Component {
    constructor(props){
        super(props);

        this.state = {
            comments: null
        }
    }

    renderDish(){
        if (this.props.dish != null)
            return(
                <Card>
                    <CardImg top src={this.props.dish.image} alt={this.props.dish.name} />
                    <CardBody>
                        <CardTitle>{this.props.dish.name}</CardTitle>
                        <CardText>{this.props.dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        else
            return(
                <div></div>
            );
    }

    renderComments(){
        if(this.props.dish != null){
            this.comments = this.props.dish.comments.map((comment) => {
                const dateObj = new Date((comment.date));
                const month = dateObj.toDateString().slice(3, 15);
                return (
                    <ul className="list-unstyled">
                        <li>{comment.comment}</li>
                        <li>-- {comment.author}, {month}</li>
                    </ul>
                );
            });
            return(
                <Card>
                    <CardBody>
                        <CardTitle><h4>Comments</h4></CardTitle>
                        <CardText>{this.comments}</CardText>
                    </CardBody>
                </Card>
            )
        }

        else
            return(
                <div></div>
            );
    }

    render(){
        return(
          <div className="container">
              <div className="row">
                  <div className="col-12 col-md-5 m-1">
                      {this.renderDish()}
                  </div>
                  <div className="col-12 col-md-5 m-1">
                      {this.renderComments()}
                  </div>
              </div>
          </div>
        );
    }
}


export default DishDetail;