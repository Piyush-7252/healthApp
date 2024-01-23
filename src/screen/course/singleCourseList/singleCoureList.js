/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, RefreshControl, View} from 'react-native';
import {layoutPadding} from '../../../components/Layout/layoutStyle';
import palette from '../../../theme/palette';
import CourseItemSkeleton from '../coureItemSkeleton';
import SingleCourseItem from './singleCourseItem';

const SingleItemCourseList = props => {
  const {
    courses,
    coursesLoading,
    onItemClick = () => {},
    onComponentRefresh = () => {},
  } = props || {};
  const [refreshing, setRefreshing] = useState(false);

  const renderCourseSkeletonList = () => {
    const totalSkeletons = Array(10).fill(null);
    return (
      <FlatList
        style={{flex: 1}}
        ItemSeparatorComponent={() => <View style={{height: 20}} />}
        renderItem={CourseItemSkeleton}
        keyExtractor={(item, index) => index}
        data={totalSkeletons || []}
        contentContainerStyle={{
          paddingTop: 25,
          paddingBottom: 30,
          ...layoutPadding,
        }}
      />
    );
  };

  const renderItem = useCallback(
    ({item}) => {
      return <SingleCourseItem item={item} onItemClick={onItemClick} />;
    },
    [onItemClick],
  );

  const onRefresh = () => {
    setRefreshing(true);
    onComponentRefresh();
  };

  useEffect(() => {
    setRefreshing(false);
  }, [courses]);

  const CourseList = () => {
    return (
      <>
        {coursesLoading && !courses ? (
          renderCourseSkeletonList()
        ) : (
          <FlatList
            style={{flex: 1}}
            ItemSeparatorComponent={() => <View style={{height: 20}} />}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            data={courses || []}
            contentContainerStyle={{
              paddingBottom: 25,
              paddingTop: 25,
              ...layoutPadding,
            }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        )}
      </>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: palette.background.default,
        // ...layoutPadding,
      }}>
      <CourseList />
    </View>
  );
};

export default SingleItemCourseList;
