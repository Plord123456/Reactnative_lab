import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';


import { DISHES } from '../shared/dishes';


class Menu extends Component {
constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES
    };
  }

  render() {
    return (
      <FlatList
        data={this.state.dishes}
        renderItem={({ item, index }) => this.renderMenuItem(item, index)}
        keyExtractor={(item) => item.id.toString()}
      />
    );
  }
  renderMenuItem(item, index) {
    return (
        <ListItem key={index} onPress={() => this.props.navigation.navigate('Dishdetail', { dishId: item.id })}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
         <Avatar source={require('./images/uthappizza.png')} />
         <ListItem.Content style={{ marginLeft: 10 }}>
           <ListItem.Title>{item.name}</ListItem.Title>
           <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
          </ListItem.Content>
        </View>
      </ListItem>
    );
  }
  //1.1.4.2
  //   onDishSelect(item) {
  //   this.setState({ selectedDish: item });
  // }
}
export default Menu;