import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import { FormDown, FormNext } from 'grommet-icons';

import { Box, Button, Collapsible, Grommet, Text } from '../';
import { grommet } from '../../themes';

class SimpleCollapsible extends Component {
  state = {
    open: false,
  }
  render() {
    const { open } = this.state;
    return (
      <Grommet theme={grommet}>
        <Box align='start' gap='small'>
          <Button primary={true} onClick={() => this.setState({ open: !this.state.open })} label='Toggle' />
          <Collapsible open={open}>
            <Box background='light-2' round='medium' pad='medium' align='center' justify='center'>
              <Text>This is a box inside a Collapsible component</Text>
            </Box>
          </Collapsible>
          <Text>This is other content outside the Collapsible box</Text>
        </Box>
      </Grommet>
    );
  }
}

const MenuButton = ({ label, open, submenu, ...rest }) => {
  const Icon = open ? FormDown : FormNext;
  return (
    <Button
      hoverIndicator='background'
      {...rest}
    >
      <Box
        margin={submenu ? { left: 'small' } : undefined}
        direction='row'
        align='center'
        pad='xsmall'
      >
        <Icon color='brand' />
        <Text size='small'>{label}</Text>
      </Box>
    </Button>
  );
};

class NestedCollapsible extends Component {
  state = {
    openMenu1: false,
    openSubmenu1: false,
    openMenu2: false,
  }
  render() {
    const { openMenu1, openSubmenu1, openMenu2 } = this.state;
    return (
      <Grommet theme={grommet}>
        <Box width='small'>
          <MenuButton
            open={openMenu1}
            label='Accordion'
            onClick={() => {
              const newOpenMenu1 = !this.state.openMenu1;

              this.setState({
                openMenu1: newOpenMenu1,
                openSubmenu1: !newOpenMenu1 ? false : openSubmenu1,
              });
            }}
          />
          <Collapsible open={openMenu1}>
            <MenuButton
              submenu={true}
              open={openSubmenu1}
              label='Accordion Basics'
              onClick={() => this.setState({
                openSubmenu1: !this.state.openSubmenu1,
              })}
            />
            <Collapsible open={openSubmenu1}>
              <Button hoverIndicator='background' onClick={() => alert('Submenu item 1 selected')}>
                <Box margin={{ left: 'medium' }} direction='row' align='center' pad='xsmall'>
                  <Text size='small'>Submenu item 1</Text>
                </Box>
              </Button>
              <Button hoverIndicator='background' onClick={() => alert('Submenu item 2 selected')}>
                <Box margin={{ left: 'medium' }} direction='row' align='center' pad='xsmall'>
                  <Text size='small'>Submenu item 2</Text>
                </Box>
              </Button>
            </Collapsible>
          </Collapsible>
          <MenuButton
            open={openMenu2}
            label='Button'
            onClick={() => this.setState({
              openMenu2: !this.state.openMenu2,
            })}
          />
          <Collapsible open={openMenu2}>
            <Button hoverIndicator='background' onClick={() => alert('Submenu item 1 selected')}>
              <Box margin={{ left: 'medium' }} direction='row' align='center' pad='xsmall'>
                <Text size='small'>Submenu item 1</Text>
              </Box>
            </Button>
          </Collapsible>
        </Box>
      </Grommet>
    );
  }
}

storiesOf('Collapsible', module)
  .add('Default', () => (
    <SimpleCollapsible />
  ))
  .add('Nested', () => (
    <NestedCollapsible />
  ));
