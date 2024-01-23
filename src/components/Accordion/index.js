import React, {useState} from 'react';
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import Collapsible from 'react-native-collapsible';
import Typography from '../Typography';
import * as Animatable from 'react-native-animatable';
import {TouchableRipple} from 'react-native-paper';
import {Icon} from '../icon';

const Accordion = ({title, items, itemRendere, addOnIcon}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleAccordion = () => {
    setIsCollapsed(!isCollapsed);
  };

  const renderItem = ({item}) => (
    <Animatable.View style={styles.item}>
      <Animatable.View
        duration={300}
        easing="ease-out"
        animation={!isCollapsed ? 'zoomIn' : false}
        style={{marginBottom: 8}}>
        <Typography>{item.title}</Typography>
      </Animatable.View>
      {/* Add more animated components or styles as needed */}
      <Animatable.View
        duration={300}
        easing="ease-out"
        animation={!isCollapsed ? 'fadeInDown' : false}
        style={{marginTop: 8}}>
        <Typography>{item.content}</Typography>
      </Animatable.View>
    </Animatable.View>
  );

  return (
    <View>
      <TouchableRipple onPress={toggleAccordion}>
        <View style={styles.header}>
          <Typography variant="labelLarge">{title}</Typography>
          <View style={{flexDirection: 'row', gap: 10}}>
            {addOnIcon && addOnIcon}
            <Icon name={isCollapsed ? 'chevron-down' : 'chevron-up'} />
          </View>
        </View>
      </TouchableRipple>
      <Collapsible collapsed={isCollapsed}>
        <FlatList
          data={items}
          renderItem={itemRendere || renderItem}
          keyExtractor={item => item.title} // Assuming each item has a unique title
        />
      </Collapsible>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#CCCCCC',
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#CCCCCC',
  },
});

export default Accordion;
