import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Header from '../../components/Layout/header';
import {layoutPadding} from '../../components/Layout/layoutStyle';
import Typography from '../../components/Typography';
import Layout from '../../components/Layout';
import {Divider, TouchableRipple} from 'react-native-paper';
import {verticalScale} from '../../lib/utils';
import {Icon} from '../../components/icon';
import {store} from '../../store/index';
import {
  clearData,
  clearReadData,
  clearStoreData,
} from '../../store/actions/crud';
import {clearLocalStorage} from '../../lib/asyncStorage';
import {USER_DETAILS} from '../../store/types';
const handleLogout = async () => {
  const dispatch = store.dispatch;
  await clearLocalStorage();
  dispatch(clearStoreData());

  // setLocalStorage({key: 'isAuthenticated', value: 'false'});
};
const lists = [
  // {
  //   name: 'Edit Profile',
  //   onPress: () => {},
  //   icon: <Icon name="chevron-right" />,
  // },
  {
    name: 'Change Password',
    onPress: () => {},
    icon: <Icon name="chevron-right" />,
  },
  {
    name: 'Manage Subscription',
    onPress: () => {},
    icon: <Icon name="chevron-right" />,
  },
  {
    name: 'Language',
    onPress: () => {},
    icon: <Icon name="chevron-right" />,
  },
  {
    name: 'Get Help',
    onPress: () => {},
    icon: <Icon name="chevron-right" />,
  },
  {
    name: 'Logout',
    onPress: handleLogout,
    icon: <Icon name="sign-out" />,
  },
];

const ItemComponent = ({item}) => {
  const {name, icon, onPress} = item;
  return (
    <View key={name}>
      <TouchableOpacity
        onPress={() => onPress()}
        style={{
          paddingVertical: verticalScale(20),
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Typography variant="titleSmall">{item.name}</Typography>
        {icon && icon}
      </TouchableOpacity>

      <Divider />
    </View>
  );
};

export const Settings = () => {
  return (
    <Layout bigTitle={'Settings'}>
      <View>
        <View>
          {lists.map(item => {
            return <ItemComponent key={item.name} item={item} />;
          })}
        </View>
      </View>
    </Layout>
  );
};
export default Settings;
