import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import makeStyles from '@mui/styles/makeStyles';
import { tabsStyling } from 'src/lib/constants';

const useStyles = makeStyles({
  root: {
    ...tabsStyling.root,
  },
  selected: {
    ...tabsStyling.selected,
  },
});

const Tabs = ({
  data,
  iconPosition,
  tabClasses,
  tabIndicatorProps,
  tabPanelStyle,
  selectedTab,
}) => {
  const [value, setValue] = useState(selectedTab || data?.[0]?.label);
  const classes = useStyles();

  const handleChange = useCallback((event, newValue) => {
    setValue(newValue);
  }, []);

  return (
    <TabContext value={value}>
      <TabList
        onChange={handleChange}
        variant="scrollable"
        align="center"
        TabIndicatorProps={{
          sx: {
            ...tabIndicatorProps,
          },
        }}
        sx={{
          '& .MuiTabScrollButton-root.Mui-disabled': {
            display: 'none',
          },
        }}
      >
        {data.map((item, index) => (
          <Tab
            classes={{
              ...classes,
              ...tabClasses,
            }}
            key={index}
            label={item.label}
            value={item.label}
            icon={item.icon}
            iconPosition={iconPosition}
          />
        ))}
      </TabList>

      {data.map((item, index) => {
        const Component = item?.component;
        return (
          <TabPanel
            key={index}
            value={item.label}
            sx={{ ...tabPanelStyle, flexGrow: 1, overflow: 'auto' }}
          >
            <Component {...item.componentProps} />
          </TabPanel>
        );
      })}
    </TabContext>
  );
};

Tabs.defaultProps = {
  selectedTab: 0,
  iconPosition: 'start',
  tabClasses: {},
  tabIndicatorProps: {},
  isRoutingAllow: true,
};

Tabs.propTypes = {
  selectedTab: PropTypes.number,
  iconPosition: PropTypes.oneOf(['start', 'end', 'top', 'bottom']),
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      icon: PropTypes.node,
      component: PropTypes.node,
      componentProps: PropTypes.objectOf,
    })
  ).isRequired,
  tabClasses: PropTypes.objectOf,
  tabIndicatorProps: PropTypes.objectOf,
  isRoutingAllow: PropTypes.bool,
};

export default Tabs;
