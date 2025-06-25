import { Group, Box, Paper, Grid, Text, TextInput } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { TopBar } from "../TopBar/TopBar";

export const Reports = () => {
  const isExtraSmallScreen = useMediaQuery('(max-width: 480px)');
  const isSmallScreen = useMediaQuery('(max-width: 768px)');
  const isMediumScreen = useMediaQuery('(max-width: 1024px)');
  const isLargeScreen = useMediaQuery('(max-width: 1440px)');
  const containerMargin = isExtraSmallScreen 
    ? '5px' 
    : isSmallScreen 
      ? '10px' 
      : isMediumScreen 
        ? '15px' 
        : isLargeScreen 
          ? '20px' 
          : '30px';

  const containerWidth = `calc(100vw - ${containerMargin} * 2)`;

  return (
    <Box
      style={{
        marginLeft: containerMargin,
        marginRight: containerMargin,
        maxWidth: containerWidth,
        boxSizing: 'border-box',
        paddingBottom: '20px',
      }}
    >
      <Group justify="space-between" wrap="wrap" gap="sm" style={{ marginBottom: '0px' }}>
        <h1 style={{ 
          marginLeft: isMediumScreen ? '20px' : '0px', 
          fontSize: isExtraSmallScreen ? '24px' : '35px' 
        }}>
          Reports
        </h1>
        <TopBar />
      </Group>

      <Paper style={{
          padding: isSmallScreen ? "20px" : "50px 20px",
          margin: isSmallScreen ? "20px 0px" : "30px 0px",
          backgroundColor: "#F9F9F9",
          borderRadius: '20px'
        }} pb={250}>
            
            <Grid>
              <Grid.Col span={isExtraSmallScreen ? 12 : 6}>
                <Group style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '80px', padding: '10px 60px' }}>
                  <Text style={{ fontSize: '18px', color: '#4C4E6A' }}>Search Criteria : N/A</Text>
                  <Text style={{ fontSize: '18px', color: '#4C4E6A' }}>Search Criteria : N/A</Text>
                  <TextInput
                      label="Start Date"
                      placeholder="Select date"
                      type='date'
                      multiple
                      mb="sm"
                      required
                      style={{ width: isSmallScreen ? '100%' : '60%' }}
                      styles={{
                        input: {
                          padding: '25px 20px',
                          borderRadius: '10px',
                          borderColor: '#53CCFF',
                        },
                        label: {
                          fontSize: '18px',
                          marginBottom: '5px',
                          color: '#4C4E6A',
                        },
                      }}
                    />
                </Group>
              </Grid.Col>
              <Grid.Col span={isExtraSmallScreen ? 12 : 6}>
                <Group style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '80px', padding: '10px 60px' }}>
                  <Text style={{ fontSize: '18px', color: '#4C4E6A' }}>From : N/A</Text>
                  <Text style={{ fontSize: '18px', color: '#4C4E6A' }}>To : N/A</Text>
                  <TextInput
                      label="End Date"
                      placeholder="Select date"
                      type='date'
                      multiple
                      mb="sm"
                      required
                      style={{ width: isSmallScreen ? '100%' : '60%' }}
                      styles={{
                        input: {
                          padding: '25px 20px',
                          borderRadius: '10px',
                          borderColor: '#53CCFF',
                        },
                        label: {
                          fontSize: '18px',
                          marginBottom: '5px',
                          color: '#4C4E6A',
                        },
                      }}
                    />
                </Group>
              </Grid.Col>
            </Grid>
      </Paper>
    </Box>
  );
};