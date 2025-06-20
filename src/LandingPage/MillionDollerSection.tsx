import { Box, Button, Flex, Grid, Text, Title, TextInput } from '@mantine/core';

export default function MillionDollerSection() {
  return (
    <Box
      style={{
        minHeight: '100vh',
        width: '100vw',
        background: '#100E22',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Grid
        justify="center"
        style={{ flex: 1, padding: '0 20px', marginTop: '50px' }}
      >
        <Grid.Col span={8}>
          <div style={{ marginTop: '8%', padding: '20px' }}>
            <Title style={{ color: '#FFF600', fontSize: '40px', marginTop: '20px' }}>
              Your <span style={{ color: '#C77DFF' }}>Million-Dollar</span> Moment Starts Here!
            </Title>
            <Text style={{ color: '#fff', fontSize: '26px', marginTop: '20px', fontWeight: '700' }}>
              Play Today – Win Big Tomorrow
            </Text>
            <Text style={{ color: '#fff', fontSize: '16px', fontWeight: '600', marginTop: '20px' }}>
              Every <span style={{ color: '#C77DFF' }}> ticket </span>you buy opens the door to something{' '}
              <span style={{ color: '#C77DFF' }}> extraordinary </span>— whether it's a{' '}
              <span style={{ color: '#C77DFF' }}> multi-million-dollar jackpot </span> or the latest must-have product. Imagine waking up debt-free,
              booking that dream vacation, or cruising in your brand-new car — all possible with just one lucky click. But it doesn’t stop there. Our
              platform also lets you win real products like <span style={{ color: '#C77DFF' }}> iPhones, gaming consoles, luxury bags,</span> and more —
              all at a fraction of their price. It's not just a game of luck; it’s your chance to upgrade your lifestyle, win big, and shop smart — all
              in one place. <span style={{ color: '#C77DFF' }}> One ticket. Endless possibilities. </span>
            </Text>
          </div>
          <Text style={{ color: '#FFF600', fontSize: '60px', fontWeight: '700', marginTop: '20px' }}>
            Be the First to Join.
          </Text>
          <Text style={{ color: '#FFF600', fontSize: '60px', fontWeight: '700' }}>
            Be the First to Win Big.
          </Text>
          <Text style={{ color: '#fff', fontSize: '20px', fontWeight: '600' }}>
            Get the WinVault app before it goes public. More chances, more rewards, more wins.
          </Text>
          <Flex align="center" mt="md" gap="md">
            <TextInput
              placeholder="Enter Your Email"
              style={{
                flex: 1,
                background: '#fff',
                border: 'none',
                borderRadius: '20px',
                padding: '10px 15px',
                color: '#999',
                fontSize: '16px',
                outline: 'none'
              }}
              styles={{
                input: {
                  '&::placeholder': {
                    color: '#999',
                  },
                },
              }}
            />
            <Button
              variant="filled"
              style={{
                background: '#C77DFF',
                borderRadius: '20px',
                padding: '10px 20px',
                color: '#fff',
                fontWeight: 600,
                fontSize: '16px',
                border: 'none',
                height: '40px',
              }}
            >
              Get Early Access
            </Button>
          </Flex>
        </Grid.Col>
        <Grid.Col span={4}>
          <img
            src="assets/million-doller.png"
            alt="Woman"
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </Grid.Col>
      </Grid>
    </Box>
  );
}