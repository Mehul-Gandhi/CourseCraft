// import React, { Component }  from 'react';
// import logo from './logo.svg';
// import './App.css';
// import UploadButton from './components/UploadButton';
// import Banner from './components/Banner';

// function App() {
//   return (
//     <div className="App">
//       <Banner />
//       <UploadButton />
//     </div>
//   );
// }

// 
// import * as React from 'react';
// import { Button } from '@nextui-org/react';
// import { NextUIProvider } from '@nextui-org/react';
// const Component = () => <Button>Click me</Button>;
// function App({ Component }) {
//   // 2. Use at the root of your app

//   return (
    
//     <NextUIProvider>
//       <Component />
//     </NextUIProvider>
//   );
// }
import React from 'react';
import { NextUIProvider, Button, useTheme, Text, blueDark } from '@nextui-org/react';

function App() {
  const { theme } = useTheme();
  const Component = () => <Button>Click me</Button>;
  return (
    <NextUIProvider theme={blueDark}>
      <div className="App">
        <Button color="primary" auto onClick={() => alert('Button clicked!')}>
          Click me
        </Button>
        <Text
          css={{
            color: '$blue800',
            fontSize: '$sm',
            padding: '$2 $4'
          }}
        >
          Using tokens
        </Text>
        <p
          style={{
            color: theme.colors.primary.value,
            fontSize: theme.fontSizes.sm.value,
            padding: `${theme.space[2].value} ${theme.space[4].value}`
          }}
        >
          Using color theme value
        </p>
      </div>
    </NextUIProvider>
  );
}

export default App;
