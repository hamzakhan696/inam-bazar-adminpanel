import { Box, Button, Flex, Grid, Text, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

export default function HeroSection() {
      const issmMobile = useMediaQuery('(max-width: 378px)');
    const isMobile = useMediaQuery('(max-width: 568px)');
    const isTablet = useMediaQuery('(max-width: 768px)');
    const isTablet2 = useMediaQuery('(max-width: 828px)');

  return (
  <Box
      style={{
        minHeight: '100vh',
        width: '100vw',
        backgroundImage: 'url(assets/Frame.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        marginBottom: 0,
      }}
    >
      <Flex justify="space-between" align="center" w="100%" px={isMobile ? 30 : 40} pt={32}>
    <img
          src="assets/Inaam Bazar.png"
          alt="Logo"
          style={{
            width: isMobile ? '100px' : isTablet ? '120px' : '180px',
            height: 'auto',
          }}
        />
        <Button
          size= {isMobile ? "sm" : "lg"}
          radius="md"
          style={{
            color: '#000',
            background: '#FBE751',
            fontWeight: 700,
            fontSize: 20,
            boxShadow: '0 4px 24px 0 rgba(162,89,247,0.2)',
          }}
        >
          Get Early Access
        </Button>
      </Flex>

      <Grid
       
        style={{ flex: 1, paddingLeft: isMobile ? '20px' : '70px', marginTop: issmMobile ? '40px' :  isMobile ? '80px' : isTablet2 ? '40px' : '10px' }}
      >
        <Grid.Col span={isTablet2 ? 12 : 6} mt={isTablet2 ? 0 : 150}>
          <Title order={1} style={{ color: '#FFF600', fontSize: isMobile ? '28px' : '48px', fontWeight: 900 }}>
            Ready to Get Lucky?
          </Title>
          <Title mt={20} order={1} style={{ color: '#fff',  fontSize: isMobile ?  '30px' : '50px', fontWeight: 900 }}>
            One Ticket Could Make You a <span style={{ color: '#5B3DEF' }}>Millionaire!</span>
          </Title>
          <Text style={{ color: '#fff', fontSize: '20px', marginTop: '20px' }}>
            Don't miss your chance! Will you be our next lucky winner?
          </Text>
        </Grid.Col>
        <Grid.Col span={isTablet2 ? 12 : 6}>
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
     
      </Box>
    </Box>
  );
}
