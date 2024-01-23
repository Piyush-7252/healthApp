/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
import Typography from '../../components/Typography';
import {GET_CATEGORIES_LIST, GET_COURSES_LIST} from '../../store/types';
import {API_URL, REQUEST_METHOD} from '../../api/constants';
import {
  FlatList,
  RefreshControl,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import {Icon} from '../../components/icon';
import useCRUD from '../../hooks/useCRUD';
import {Card} from 'react-native-paper';
import {scale} from '../../lib/utils';
import palette from '../../theme/palette';
import CourseItemSkeleton from './coureItemSkeleton';

import {layoutPadding} from '../../components/Layout/layoutStyle';
import Categories from '../categories';
import {UI_ROUTES} from '../../lib/routeConstants';
import RenderHTML from 'react-native-render-html';
import Image from '../../components/Image';

const CourseList = props => {
  const {navigation} = props || {};
  const [refreshing, setRefreshing] = useState(false);
  const [courses, , coursesLoading, getCourses, clearCoursesData] = useCRUD({
    id: GET_COURSES_LIST,
    url: `${API_URL.coursesList}`,
    type: REQUEST_METHOD.get,
  });

  useEffect(() => {
    getCourses({_embed: true});
  }, []);

  const onItemClick = useCallback(
    ({item}) => {
      const {id} = item || {};
      navigation.navigate('CourseDetail', {
        id,
      });
    },
    [navigation],
  );
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
          paddingTop: 30,
          paddingBottom: 30,
          gap: 20,
          ...layoutPadding,
        }}
        horizontal
      />
    );
  };

  const renderItem = useCallback(
    ({item}) => {
      const {
        title: {rendered: title} = {},
        _embedded,
        content: {rendered: duration} = {},
      } = item;
      const imageUrl = _embedded?.['wp:featuredmedia']?.[0]?.source_url;
      return (
        <View>
          <Card
            onPress={() => {
              onItemClick({item});
            }}>
            <Image
              source={{uri: imageUrl}}
              style={{
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                width: '100%',
                height: 200,
                borderRadius: 12,
              }}
            />
            <Card.Content
              style={{
                paddingTop: 8,
                backgroundColor: palette.background.default,
                borderRadius: 12,
                flexDirection: 'column',
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
              }}>
              <Typography
                variant="titleMedium"
                width={scale(800)}
                numberOfLines={1}>
                {title}
              </Typography>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8,
                  marginTop: 5,
                }}>
                <Icon name="clock-o" />
                <View style={{flexDirection: 'row', gap: 3}}>
                  <RenderHTML
                    source={{
                      html: duration || '<p>1:04</p>',
                    }}
                    contentWidth={30}
                    tagsStyles={{
                      p: {
                        color: palette.text.primary,
                        fontWeight: 600,
                        padding: 0,
                        margin: 0,
                      },
                    }}
                  />
                  <Typography variant="labelLarge">Min</Typography>
                </View>
              </View>
            </Card.Content>
          </Card>
        </View>
      );
    },
    [onItemClick],
  );

  const NewCourses = ({title = 'New Courses', onPress = () => {}}) => {
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
            ...layoutPadding,
          }}>
          <Typography variant="titleMedium">{title}</Typography>
          <TouchableOpacity onPress={onPress}>
            <Typography>View All</Typography>
          </TouchableOpacity>
        </View>
        {coursesLoading && !courses ? (
          renderCourseSkeletonList()
        ) : (
          <FlatList
            style={{flex: 1}}
            ItemSeparatorComponent={() => <View style={{width: 20}} />}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            data={courses || []}
            contentContainerStyle={{
              paddingBottom: 25,
              paddingTop: 25,
              ...layoutPadding,
            }}
            horizontal
          />
        )}
      </>
    );
  };
  const onCategoryPress = ({item}) => {
    const {id} = item;
    navigation.navigate(UI_ROUTES.categoryWiseCourses, {id});
  };

  const onNewCourseViewAllPress = () => {
    navigation.navigate(UI_ROUTES.filterWiseCourses, {title: 'New Courses'});
  };
  const onPopularViewAllPress = () => {
    navigation.navigate(UI_ROUTES.filterWiseCourses, {title: 'Popular'});
  };
  const onRefresh = () => {
    setRefreshing(true);
    getCourses({_embed: true});
  };
  useEffect(() => {
    setRefreshing(false);
  }, [courses]);
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={{
        flex: 1,
        backgroundColor: palette.background.default,
        // ...layoutPadding,
      }}>
      <Categories
        onItemPress={onCategoryPress}
        refreshing={refreshing}
        showSelected={false}
      />
      <NewCourses onPress={onNewCourseViewAllPress} />
      <NewCourses title={'Popular'} onPress={onPopularViewAllPress} />
    </ScrollView>
  );
};

export default CourseList;
