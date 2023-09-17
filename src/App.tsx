import Navbar from "./components/nav/Navbar"
import MatrixGauss from "./components/matrixGauss/MatrixGauss"
import Grid from "@mui/material/Grid";
import {Container, Typography,} from "@mui/material";
import FixedPointIteration from "./components/fixedPoinIteration/FixedPointIteration";
import Box from "@mui/material/Box";
import {TabsPanel} from "./components/TabsPanel/TabsPanel";

const App = () => {

  return (
    <div>
      <Navbar/>
     <Container>
         <TabsPanel/>
         {/*<Grid className="pt-20 p-5" container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>*/}
         {/*    <Grid item xs={12}>*/}
         {/*        <Typography variant="h5">The Gaussian method</Typography>*/}
         {/*        <MatrixGauss rows={3} cols={4}/>*/}
         {/*    </Grid>*/}
         {/*    <Grid item xs={12}>*/}
         {/*        <FixedPointIteration/>*/}
         {/*    </Grid>*/}
         {/*</Grid>*/}
     </Container>
    </div>
  )
}

export default App
