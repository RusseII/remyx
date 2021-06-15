import React from 'react';
import Grid from '@material-ui/core/Grid';

import { Example1 } from './Example1';
import { Example2 } from './Example2';
import { Example3 } from './Example3';
import { Example4 } from './Example4';
import { Example5 } from './Example5';
import { SliderDemo } from '../SliderDemo';

export default () => (
  <Grid spacing={4} container direction="column">
    <Grid item>
      <SliderDemo
        title="Simple Value Slider"
        subtitle="mode = 2 step = 5"
        sourcePath="material-ui/Example1.tsx"
      >
        <Example1 />
      </SliderDemo>
    </Grid>
    <Grid item>
      <SliderDemo
        title="Allow Crossing"
        subtitle="mode = 1 step = 1"
        sourcePath="material-ui/Example2.tsx"
      >
        <Example2 />
      </SliderDemo>
    </Grid>
    <Grid item>
      <SliderDemo
        title="Prevent Crossing"
        subtitle="mode = 2 step = 10"
        sourcePath="material-ui/Example3.tsx"
      >
        <Example3 />
      </SliderDemo>
    </Grid>
    <Grid item>
      <SliderDemo
        title="Reversed - Pushable Mode"
        subtitle="mode = 3 step = 20"
        sourcePath="material-ui/Example4.tsx"
      >
        <Example4 />
      </SliderDemo>
    </Grid>
    <Grid item>
      <SliderDemo
        title="Formatting Ticks"
        subtitle="mode = 2 step = 0.01"
        sourcePath="material-ui/Example5.tsx"
      >
        <Example5 />
      </SliderDemo>
    </Grid>
  </Grid>
);
