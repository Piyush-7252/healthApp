import React, {useEffect} from 'react';
import {GET_COURSES_LIST_FILTER_WISE} from '../../store/types';
import {API_URL, REQUEST_METHOD} from '../../api/constants';
import useCRUD from '../../hooks/useCRUD';
import palette from '../../theme/palette';
import {View} from 'react-native';
import Typography from '../../components/Typography';
import {layoutPadding} from '../../components/Layout/layoutStyle';
import SingleItemCourseList from '../course/singleCourseList/singleCoureList';
const FilterListingCourse = props => {
  const {navigation, route: {params = {}} = {}} = props || {};
  const {title = 'New Courses'} = params;
  const [courses, , coursesLoading, getCourses, clearCoursesData] = useCRUD({
    id: `${GET_COURSES_LIST_FILTER_WISE}-${title}`,
    url: `${API_URL.coursesList}`,
    type: REQUEST_METHOD.get,
  });
  useEffect(() => {
    getCourses({_embed: true});
  }, []);
  const onRefresh = () => {
    getCourses({_embed: true});
  };
  const onItemClick = ({item}) => {
    const {id} = item || {};
    navigation.navigate('CourseDetail', {
      id,
    });
  };
  return (
    <>
      <View
        style={{
          ...layoutPadding,
          backgroundColor: palette.background.default,
        }}>
        <View style={{marginBottom: 10, marginTop: 20}}>
          <Typography variant="titleMedium">{title}</Typography>
        </View>
      </View>
      <SingleItemCourseList
        courses={courses}
        coursesLoading={coursesLoading}
        onComponentRefresh={onRefresh}
        onItemClick={onItemClick}
      />
    </>
  );
};

export default FilterListingCourse;
