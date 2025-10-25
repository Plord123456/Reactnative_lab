import React, { Component } from 'react';
import { FlatList, View,Text  } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import Loading from './LoadingComponent';

// import { DISHES } from '../shared/dishes';
import { baseUrl } from '../shared/baseUrl';

// redux
import { connect } from 'react-redux';
const mapStateToProps = (state) => {
  return {
    dishes: state.dishes
  }
};

class Menu extends Component {
constructor(props) {
    super(props);
    // this.state = {
    //   dishes: DISHES
    // };
  }

  render() {
    // Put the logic directly in the render method
    if (this.props.dishes.isLoading) {
      return (
        <Loading />
      );
    } 
    else if (this.props.dishes.errMess) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>{this.props.dishes.errMess}</Text>
        </View>
      );
    } 
    else {
      return (
        <FlatList
          data={this.props.dishes.dishes}
          renderItem={({ item, index }) => this.renderMenuItem(item, index)}
          keyExtractor={(item) => item.id.toString()}
        />
      );
    }
  }
  renderMenuItem(item, index) {
    return (
        <ListItem key={index} onPress={() => this.props.navigation.navigate('Dishdetail', { dishId: item.id })}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <Avatar source={{uri: baseUrl + item.image}} />
         <ListItem.Content style={{ marginLeft: 10 }}>
           <ListItem.Title>{item.name}</ListItem.Title>
           <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
          </ListItem.Content>
        </View>
      </ListItem>
    );
  }

}
export default connect(mapStateToProps)(Menu);
