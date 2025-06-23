import { Box, Flex, Grid, Text, Title,  } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

export default function MillionDollerSection() {
      const isMobile = useMediaQuery('(max-width: 568px)');
      // const isTablet = useMediaQuery('(max-width: 768px)');
      const isTablet2 = useMediaQuery('(max-width: 828px)');
      const issmMobile = useMediaQuery('(max-width: 378px)');
      
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
        style={{ flex: 1, paddingLeft: isTablet2 ? '20px' : '60px' , marginTop: isTablet2 ? '0px' : '50px' }}
      >
        <Grid.Col span={isTablet2 ? 12 : 8}>
          <div style={{ marginTop: '8%', padding: '20px' }}>
            <Title style={{ color: '#FFF600', fontSize: isTablet2 ? '24px' : '40px', marginTop: '20px' }}>
              Your <span style={{ color: '#C77DFF' }}>Million-Dollar</span> Moment Starts Here!
            </Title>
            <Text style={{ color: '#fff', fontSize: isTablet2 ? '18px' : '26px', marginTop: '20px', fontWeight: '700' }}>
              Play Today – Win Big Tomorrow
            </Text>
            <Text style={{ color: '#fff', fontSize: isMobile ? '12px' : '16px', fontWeight: '600', marginTop: '20px', width: issmMobile ? '300px' : isMobile ? '350px' : isTablet2 ? '600px' : '800px' }}>
              Every <span style={{ color: '#C77DFF' }}> ticket </span>you buy opens the door to something{' '}
              <span style={{ color: '#C77DFF' }}> extraordinary </span>— whether it's a{' '}
              <span style={{ color: '#C77DFF' }}> multi-million-dollar jackpot </span> or the latest must-have product. Imagine waking up debt-free,
              booking that dream vacation, or cruising in your brand-new car — all possible with just one lucky click. But it doesn’t stop there. Our
              platform also lets you win real products like <span style={{ color: '#C77DFF' }}> iPhones, gaming consoles, luxury bags,</span> and more —
              all at a fraction of their price. It's not just a game of luck; it’s your chance to upgrade your lifestyle, win big, and shop smart — all
              in one place. <span style={{ color: '#C77DFF' }}> One ticket. Endless possibilities. </span>
            </Text>
          </div>
          <div style={{ paddingLeft: '5%' }}>
            <Text style={{ color: '#FFF600', fontSize: isMobile ? '27px' : isTablet2 ? '47px' : '67px', fontWeight: '700', marginTop: isTablet2 ? '5%' : '20%' }}>
              Be the First to Join.
            </Text>
            <Text style={{ color: '#FFF600', fontSize: isMobile ? '27px' : isTablet2 ? '47px' : '67px', fontWeight: '700' }}>
              Be the First to Win Big.
            </Text>
            <Text style={{ color: '#fff', fontSize: isMobile ? '16px' : '20px', fontWeight: '600' }}>
              Get the WinVault app before it goes public. More chances, more rewards, more wins.
            </Text>
         <Flex align="center" style={{ flex: 1, paddingTop: '20px' }}>
        <div style={{ display: 'flex', width: issmMobile ? '250px' : isMobile ? '300px' : '700px' }}>
          <input
            type="text"
            placeholder="Enter Your Email"
            style={{
              flex: 1,
              height: '60px',
              padding: '0 15px',
              border: 'none',
              borderRadius: '25px 0 0 25px',
              background: '#fff',
              color: '#999',
              fontSize: '16px',
              outline: 'none',
            }}
          />
          <button
            style={{
              height: '60px',
              padding: isMobile ? '10px' : '0 40px',
              border: 'none',
              borderRadius: '0 25px 25px 0',
              background: '#C77DFF',
              color: '#fff',
              fontWeight: 600,
              fontSize: isMobile ? '12px' : '18px',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            Get Early Access
          </button>
        </div>
      </Flex>

          </div>
        </Grid.Col>
        <Grid.Col span={isTablet2 ? 12 : 4}>
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
         <Text style={{ color: '#fff', fontSize: isMobile ? '12px' : '16px', textAlign: 'center', marginTop: '20px',}}>
        User Agreement |  Draw Terms  |  Condition Privacy Policy
      </Text>
      <Text style={{ color: '#fff', fontSize: isMobile ? '12px' : '16px',  textAlign: 'center', marginTop: '10px', paddingBottom: '20px' }}>
        WinVault - by Creative Code Tech © 2025 All Rights Reserved
      </Text>
    </Box>
  );
}