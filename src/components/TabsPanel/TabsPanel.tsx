import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {TabPanel} from "./Panel";
import MatrixGauss from "../../components/matrixGauss/MatrixGauss";
import FixedPointIteration from "../../components/fixedPoinIteration/FixedPointIteration";

const a11yProps = (index: number) => {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export const TabsPanel = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
       <div className="mt-20">
           <Box sx={{ width: '100%' }}>
               <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                   <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                       <Tab label="Lab1" {...a11yProps(0)} />
                       <Tab label="Lab2" {...a11yProps(1)} />
                   </Tabs>
               </Box>
               <TabPanel value={value} index={0}>
                   <Typography variant="h5">The Gaussian method</Typography>
                   <MatrixGauss rows={3} cols={4}/>
               </TabPanel>
               <TabPanel value={value} index={1}>
                   <Typography variant="h5">Fixed point iteration method</Typography>
                   <FixedPointIteration/>
               </TabPanel>
           </Box>
       </div>
    );
}

