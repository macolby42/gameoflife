import React from 'react';
import '../App.css'
import { rgbToHex } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import MenuOutlined from '@material-ui/icons/MenuOutlined'
import CloseRounded from '@material-ui/icons/CloseRounded';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

function valuetext(value) {
  return `${value}°C`;
}

class Settings extends React.Component {
  constructor(props) {
    super(props)

    // const useStyles = makeStyles({
    //   list: {
    //     width: 250,
    //   },
    //   fullList: {
    //     width: 'auto',
    //   },
    //   icon: {
    //     fontSize: "6vh",
    //     color: "#3D3D3D",
    //     "&:hover": {
    //       color: "#FFFFFF"
    //     }
    //   }
    // });
    // const classes = useStyles();
    // const theme = useTheme();
    this.state = {
      bottom: false,
      color: "disabled",
      open: false,
      options: this.props.options
    };
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
    this.changeOptions = this.changeOptions.bind(this);
  }

  handleDrawerOpen() {
    this.setState({ open: true });
  }

  handleDrawerClose() {
    this.setState({ open: false });
  }

  changeOptions(key, val) {
    var options = this.state.options;
    options[key] = val;
    this.setState({ options: options });
  }

  // const toggleDrawer = (side, open) => event => {
  //   if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Escape')) {
  //     return;
  //   }

  //   setState({ ...state, [side]: open });
  // };

  fullList = side => (
    <div
      className={"header"}
      role="presentation"
      // onClick={toggleDrawer(side, false)}
      // onKeyDown={toggleDrawer(side, false)}
    >
      <List>
          <ListItem>
            <Typography id="discrete-slider" gutterBottom>
              Pixel Size
            </Typography>
            <Slider
              defaultValue={10}
              getAriaValueText={valuetext}
              aria-labelledby="discrete-slider"
              valueLabelDisplay="auto"
              step={1}
              marks
              min={1}
              max={70}
              onChangeCommitted={(e, val) => this.changeOptions("pixelSize", val)}
            />
          </ListItem>
          <ListItem>
            <Typography id="discrete-slider" gutterBottom>
              Color
            </Typography>
            <List>
              <ListItem>
                <Slider
                  id="redBG"
                  defaultValue={0}
                  aria-labelledby="discrete-slider"
                  valueLabelDisplay="auto"
                  step={1}
                  marks
                  min={0}
                  max={255}
                  onChangeCommitted={(e, val) => this.changeOptions("backgroundColor", rgbToHex(val, this.props.greenBG, this.props.blueBG)) }
                />
              </ListItem>
              <ListItem>
                <Slider
                  id="greenBG"
                  defaultValue={0}
                  aria-labelledby="discrete-slider"
                  valueLabelDisplay="auto"
                  step={1}
                  marks
                  min={0}
                  max={255}
                  onChangeCommitted={(e, val) => this.changeOptions("backgroundColor", val)}
                />
              </ListItem>
              <ListItem>
                <Slider
                  id="blueBG"
                  defaultValue={0}
                  aria-labelledby="discrete-slider"
                  valueLabelDisplay="auto"
                  step={1}
                  marks
                  min={0}
                  max={255}
                  onChangeCommitted={(e, val) => this.changeOptions("backgroundColor", val)}
                />
              </ListItem>
            </List>
        </ListItem>
      </List>
    </div>
  );

  render() {
    return (
      <div className={"menuIcon"}>
        <Button onClick={this.handleDrawerOpen}>
            <MenuOutlined className={"menuIcon"} />
        </Button>
        <Drawer
          anchor="bottom"
          variant="persistent"
          open={this.state.open}
          // onClose={toggleDrawer('bottom', false)}
          // onOpen={toggleDrawer('bottom', true)}
        >
          <div className={"drawerHeader"}>
            <IconButton onClick={this.handleDrawerClose}>
              <CloseRounded />
            </IconButton>
          </div>
          {this.fullList('bottom')}
          {/* <Button onClick={this.props.updateOptions(this.state.options)}>
            Submit
          </Button> */}
        </Drawer>
      </div>
    );
  }
}

export default Settings;