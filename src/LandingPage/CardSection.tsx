import { Box, Button, Card, Image, Text, Title } from '@mantine/core';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './CardSection.css';
import { useMediaQuery } from '@mantine/hooks';

// Define interface for item structure
interface CardItem {
  image: string;
  title: string;
  price: string;
  cardType: string;
}

// Define interface for GenericCard props
interface GenericCardProps {
  image: string;
  title: string;
  price: string;
  cardType: string;
  onAddToCart: () => void;
}

const items: CardItem[] = [
  {
    image: 'assets/iphone.png',
    title: 'iPhone 16 Pro Max',
    price: 'Buy Pkr200',
    cardType: 'WinVault Shopping Card',
  },
  {
    image: 'assets/fortuner.png',
    title: 'Fortuner 2.7Ltr',
    price: 'Buy Pkr200',
    cardType: 'WinVault Shopping Card',
  },
  {
    image: 'assets/heavy-bike.png',
    title: 'Kawasaki Ninja',
    price: 'Buy Pkr200',
    cardType: 'WinVault Shopping Card',
  },
  {
    image: 'assets/laptop.png',
    title: 'MSI Gaming Laptop',
    price: 'Buy Pkr200',
    cardType: 'WinVault Shopping Card',
  },
  {
    image: 'assets/fortuner.png',
    title: 'Fortuner 2.7Ltr',
    price: 'Buy Pkr200',
    cardType: 'WinVault Shopping Card',
  },
];

const GenericCard: React.FC<GenericCardProps> = ({ image, title, price, cardType, onAddToCart }) => {
  return (
    <Card shadow="sm" padding={1} radius="md" className="card-container">
      <Box className="card-gradient">
        <Image src={image} height={114} fit="contain" className="card-image" />
      </Box>
      <Box className="card-content">
        <Text size="md" fw={700} style={{ fontStyle: 'italic', background: 'linear-gradient(45deg, #B360E2, #E106D9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Win
        </Text>
        <Title order={5} style={{ fontStyle: 'italic', color: '#000000' }}>
          {title}
        </Title>
        <Box className="button-row">
          <Box className="left-box">
            <Text size="sm" fw={700} ta="center" style={{ color: '#000000' }}>
              {price}
            </Text>
            <Text size="xs" fw={700} ta="center" style={{ color: '#000000' }}>
              {cardType}
            </Text>
          </Box>
          <Button className="right-box" onClick={onAddToCart}>
            Add to Cart
          </Button>
        </Box>
        <Text fw={700} style={{ color: '#000', marginTop: '10px', fontSize: '9px' }}>
          Previous Draw: April 3, 2025 – Congratulations to the Winners!
        </Text>
      </Box>
    </Card>
  );
};

export default function CardSection() {
  const isMobile = useMediaQuery('(max-width: 568px)');

const settings = {
  dots: false,
  infinite: true,
  speed: 3000, // Duration of the transition (in ms) for smooth scrolling
  slidesToShow: 5,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 0, // Set to 0 for continuous scrolling without pauses
  cssEase: 'linear', // Linear easing for constant speed
  arrows: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 828,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 432,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

  return (
    <Box style={{ background: '#100E22', padding: '20px', paddingLeft: isMobile ? '30px' : '90px' }}>
      <Text ta="center" style={{ color: '#FFF600', margin: '30px 0px', fontSize: '30px', fontWeight: '700' }}>
        🎁 First Time Here? Get a FREE Ticket!
      </Text>
      <Slider {...settings}>
        {items.map((item, index) => (
          <div key={index} style={{ padding: '0 30px' }}>
            <GenericCard
              image={item.image}
              title={item.title}
              price={item.price}
              cardType={item.cardType}
              onAddToCart={() => console.log(`Added ${item.title} to cart`)}
            />
          </div>
        ))}
      </Slider>
    </Box>
  );
}