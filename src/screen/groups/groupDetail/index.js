import React, { Children, useEffect } from 'react';
import { FlatList, Image, ScrollView, View } from 'react-native';
import useCRUD from '../../../hooks/useCRUD';
import { API_URL, REQUEST_METHOD } from '../../../api/constants';
import {
  GET_GROUP_DETAIL,
  GET_GROUP_MEMBERS,
  GET_GROUP_ORGANIZERS,
} from '../../../store/types';
import MembersItem from '../members/membersItem';
import palette from '../../../theme/palette';
import Typography from '../../../components/Typography';
import { layoutPadding } from '../../../components/Layout/layoutStyle';
import LoadingButton from '../../../components/CustomButton/loadingButton';
import { horizontalScale, scale, verticalScale } from '../../../lib/utils';
import GroupDetailSkeleton from './groupDetailSkeleton';
import { ListEmptyComponent } from '../../../components/ListEmptyComponent';
import { Icon } from '../../../components/icon';
import ActionButton from '../../../components/CustomButton/actionButton';
import Header from '../../../components/Layout/header';


const GroupDetail = props => {
  const { route: { params = {} } = {} } = props || {};
  const { id, author, groupDetail } = params || {};
  // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", JSON.stringify(groupDetail));
  const [
    groupMembers,
    ,
    groupMembersLoading,
    getGroupMembers,
    clearGroupMemmbersData,
  ] = useCRUD({
    id: `${GET_GROUP_MEMBERS}-${id}`,
    url: `${API_URL.groupsList}/${id}/members`,
    type: REQUEST_METHOD.get,
  });

  const [
    groupOrganizers,
    ,
    groupOrganizersLoading,
    getGroupOrganizers,
    clearGroupOrganizersData,
  ] = useCRUD({
    id: `${GET_GROUP_ORGANIZERS}-${id}`,
    url: `${API_URL.groupsList}/${id}/members`,
    type: REQUEST_METHOD.get,
  });
  useEffect(() => {
    getGroupMembers();
    getGroupOrganizers({ roles: 'admin' });
  }, []);
  const renderItem = props => {
    return <MembersItem {...props} />;
  };

  const RenderList = ({
    data = [],
    contentContainerStyle = {},
    style = {},
    skeletonSize = 1,
    emptyMessage = 'No Items',
  } = {}) => {
    if (!groupMembers && groupMembersLoading) {
      return <GroupDetailSkeleton data={Array(skeletonSize).fill(null)} />;
    }
    return (
      <FlatList
        ItemSeparatorComponent={<View style={{ height: 20 }} />}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => item?.id || index}
        style={{ ...style }}
        contentContainerStyle={{
          paddingTop: verticalScale(16),
          ...contentContainerStyle,
        }}
        ListEmptyComponent={() => (
          <ListEmptyComponent emptyMessage={emptyMessage} />
        )}
      />
    );
  };
  const actions = [{iconName:'users',name:'Follow',action:()=>{}},{iconName:'video-camera',name:'Add Meeting',action:()=>{}},{iconName:'share-alt',name:'Share',action:()=>{}}]
  return (
    <ScrollView style={{ flex: 1, backgroundColor: palette.background.default,position:'relative' }}>
     
      <View style={{position:'relative'}}>
      <Header containerStyle={{position:'absolute', zIndex: 1,...layoutPadding}}/>
      <View style={{position: 'relative'}}>
            {/* Cover Image */}
            <Image
              source={{uri: groupDetail.cover_url}}
              style={{
                width: '100%',
                height: 250,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                // borderRadius: 12,
              }}
            />
            <View
              style={{
                position: 'absolute',
                bottom: verticalScale(-60),
                left: '50%',
                transform: [{translateX: -scale(200)}], // Move back by half of width
                width: scale(400),
              }}>
              {/* Profile Image */}
              <Image
                source={{uri: groupDetail?.avatar_urls?.full}}
                style={{
                  width: scale(400),
                  height: verticalScale(120),
                  borderRadius: 12,
                }}
              />
            </View>
          </View>
        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: scale(200),
          marginBottom:verticalScale(20),
          ...layoutPadding
        }}>
          
          <View style={{ marginTop: verticalScale(10) }}>
            <View>
              <Typography variant="titleLarge" style={{ textAlign: 'center' }}>{groupDetail.name}</Typography>
            </View>
            <View style={{ marginTop: verticalScale(5)}}>
              <Typography variant="bodyMedium" style={{ textAlign: 'justify' ,}}>{groupDetail.description.raw}</Typography>
            </View>
          </View>
          <View style={{
            marginTop: verticalScale(20),
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            gap: 30,
          }}>
            {actions.map(item=><ActionButton key={item?.name} style={{ borderRadius: 12, paddingHorizontal: 20, paddingVertical: 13, }}>
              <View style={{ alignItems: 'center', justifyContent: 'center',gap:5}}>
                <Icon name={item?.iconName} color={palette.text.paper} size={30}/>
                <Typography style={{color:palette.text.paper,}}>{item?.name}</Typography>
              </View>
              </ActionButton>)}
          </View>
        </View>
      </View>
      <View>
        <View
          style={{
            backgroundColor: palette.background.gray,
            paddingVertical: verticalScale(14),
            ...layoutPadding,
          }}>
          <Typography variant="labelLarge">Organizers</Typography>
        </View>
        <RenderList
          data={groupOrganizers}
          contentContainerStyle={{ paddingBottom: verticalScale(16) }}
          skeletonSize={1}
          emptyMessage={'No Organizers'}
        />
      </View>
      <View style={{ flex: 1 }}>
        <View
          style={{
            backgroundColor: palette.background.gray,
            paddingVertical: verticalScale(14),
            ...layoutPadding,
          }}>
          <Typography variant="labelLarge">Members</Typography>
        </View>
        <RenderList
          data={groupMembers}
          contentContainerStyle={{ paddingBottom: verticalScale(208), flex: 1 }}
          skeletonSize={10}
          style={{ flex: 1 }}
          emptyMessage={'No Members'}
        />
      </View>
    </ScrollView>
  );
};
export default GroupDetail;
