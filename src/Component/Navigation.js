import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InfoIcon from '@mui/icons-material/Info';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import ConstructionIcon from '@mui/icons-material/Construction';
import ChairIcon from '@mui/icons-material/Chair';
import NewspaperIcon from '@mui/icons-material/Newspaper';

export default function Navigation() {
  const [value, setValue] = React.useState(0);

  return (
    <Box paddingBottom={2} >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{backgroundColor:'#ffc814'}}
      >
        <BottomNavigationAction label="About Us" icon={<InfoIcon />} sx={{borderRight:1}} />
        <BottomNavigationAction label="Interior design" icon={<DesignServicesIcon />} sx={{borderRight:1}}/>
        <BottomNavigationAction label="interior construction" icon={<ConstructionIcon />} sx={{borderRight:1}}/>
        <BottomNavigationAction label="Furniture" icon={<ChairIcon />} sx={{borderRight:1}}/>
        <BottomNavigationAction label="News" icon={<NewspaperIcon />} />
      </BottomNavigation>
    </Box>
  );
}