import { Box, Button, Flex, Grid, Text, Title } from '@mantine/core';

export default function HeroSection() {
  return (
    <Box
      style={{
        minHeight: '100vh',
        width: '100vw',
        background: 'linear-gradient(259.25deg, #D95DEF -28.04%, #E8C845 100.73%)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Flex justify="space-between" align="center" w="100%" px={60} pt={32}>
        <Text
          style={{
            background: 'linear-gradient(259.26deg, #5443AC -1.04%, #7C3589 93.72%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: '50px',
            fontWeight: 700,
          }}
        >
          Logo
        </Text>
        <Button
          size="lg"
          radius="md"
          style={{
            background: 'linear-gradient(90deg, #6a5af9 0%, #a259f7 100%)',
            fontWeight: 700,
            fontSize: 20,
            boxShadow: '0 4px 24px 0 rgba(162,89,247,0.2)',
          }}
        >
          Get Early Access
        </Button>
      </Flex>

      <Grid
        justify="center"
        align="center"
        style={{ flex: 1, padding: '0 20px', marginTop: '10px' }}
      >
        <Grid.Col span={6}>
          <Title order={1} style={{ color: '#FFF600', fontSize: '38px', fontWeight: 900 }}>
            Ready to Get Lucky?
          </Title>
          <Title mt={20} order={1} style={{ color: '#fff', fontSize: '50px', fontWeight: 900 }}>
            One Ticket Could Make You a <span style={{ color: '#5B3DEF' }}>Millionaire!</span>
          </Title>
          <Text style={{ color: '#fff', fontSize: '20px', marginTop: '20px' }}>
            Don't miss your chance! Will you be our next lucky winner?
          </Text>
        </Grid.Col>
        <Grid.Col span={6}>
          <img
            src="assets/girl-with-car.png"
            alt="Woman"
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </Grid.Col>
      </Grid>

      {/* Curved bottom border */}
      <Box
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '100px',
          overflow: 'hidden',
          lineHeight: 0,
        }}
      >
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          style={{ display: 'block', width: '100%', height: '100%' }}
        >
          <path
            d="M0,0 C150,120 350,120 600,60 C850,0 1050,0 1200,60 L1200,120 L0,120 Z"
            fill="#100E22" // Match or contrast the background color
          ></path>
        </svg>
      </Box>
    </Box>
  );
}
