import React, { Component } from 'react';
import { View, Text, FlatList, ScrollView, Modal, StyleSheet, Button } from 'react-native';
import { Card, Image, Icon, Rating, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites
  }
};

const mapDispatchToProps = (dispatch) => ({
  postFavorite: (dishId) => dispatch(postFavorite(dishId)),
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
});

class RenderDish extends Component {
  render() {
    const dish = this.props.dish;
    if (dish != null) {
      return (
        <Card>
          <Image source={{ uri: baseUrl + dish.image }} style={{ width: '100%', height: 100, flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Card.FeaturedTitle>{dish.name}</Card.FeaturedTitle>
          </Image>
          <Text style={{ margin: 10 }}>{dish.description}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Icon raised reverse type='font-awesome' color='#f50'
              name={this.props.favorite ? 'heart' : 'heart-o'}
              onPress={() => this.props.favorite ? alert('Already favorite') : this.props.onPressFavorite()} />
            <Icon raised reverse type='font-awesome' name='pencil' color='#512DA8'
              onPress={() => this.props.onPressComment()} />
          </View>
        </Card>
      );
    }
    return (<View />);
  }
}

class RenderComments extends Component {
  render() {
    const comments = this.props.comments;
    return (
      <Card>
        <Card.Title>Comments</Card.Title>
        <Card.Divider />
        <View>
          {comments.map((item, index) => this.renderCommentItem(item, index))}
        </View>
      </Card>
    );
  }
  renderCommentItem(item, index) {
    return (
      <View key={index} style={{ margin: 10 }}>
        <Text style={{ fontSize: 14 }}>{item.comment}</Text>
        <Rating
          readonly
          startingValue={item.rating}
          imageSize={12}
          style={{ alignItems: 'flex-start', paddingVertical: 5 }}
        />
        <Text style={{ fontSize: 12 }}>{'-- ' + item.author + ', ' + new Date(item.date).toLocaleString()} </Text>
      </View>
    );
  };
}

class Dishdetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      author: '',
      comment: '',
      rating: 5 // Default rating
    };
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  resetForm() {
    this.setState({
      showModal: false,
      author: '',
      comment: '',
      rating: 5
    });
  }

  handleComment(dishId) {
    this.props.postComment(dishId, this.state.rating, this.state.author, this.state.comment);
    this.resetForm();
  }

  markFavorite(dishId) {
    this.props.postFavorite(dishId);
  }

  render() {
    const dishId = parseInt(this.props.route.params?.dishId);
    const dish = this.props.dishes.dishes[dishId];
    const comments = this.props.comments.comments.filter((cmt) => cmt.dishId === dishId);
    const favorite = this.props.favorites.some((el) => el === dishId);

    return (
      <ScrollView>
        <RenderDish dish={dish} favorite={favorite}
          onPressFavorite={() => this.markFavorite(dishId)}
          onPressComment={() => this.toggleModal()}
        />
        <RenderComments comments={comments} />

        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.showModal}
          onDismiss={() => this.resetForm()}
          onRequestClose={() => this.resetForm()}>
          <View style={styles.modalView}>
            <Rating
              showRating
              fractions={0}
              startingValue={this.state.rating}
              imageSize={40}
              onFinishRating={(rating) => this.setState({ rating: rating })}
              style={{ paddingVertical: 10 }}
            />
            <Input
              placeholder='Author'
              leftIcon={{ type: 'font-awesome', name: 'user-o' }}
              onChangeText={(value) => this.setState({ author: value })}
              value={this.state.author}
            />
            <Input
              placeholder='Comment'
              leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
              onChangeText={(value) => this.setState({ comment: value })}
              value={this.state.comment}
            />
            <View style={styles.buttonSubmit}>
              <Button
                title='Submit'
                color='white'
                onPress={() => this.handleComment(dishId)}
              />
            </View>
            <View style={styles.buttonCancel}>
              <Button
                title='Cancel'
                color='white'
                onPress={() => this.resetForm()}
              />
            </View>
          </View>
        </Modal>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  modalView: {
    justifyContent: 'center',
    margin: 20
  },
  
buttonSubmit: {
  margin: 10,
  backgroundColor: '#512DA8',
  borderRadius: 5,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5, // for Android
},
buttonCancel: {
  margin: 10,
  backgroundColor: 'grey',
  borderRadius: 5,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5, // for Android
}
});

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);