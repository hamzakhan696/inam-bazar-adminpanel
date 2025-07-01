import { Container, Title, Text, Divider, List, Space } from '@mantine/core';

export const PrivacyPolicy = () => {
  return (
    <div style={{ backgroundColor: '#100E22', minHeight: '100vh', color: 'white', minWidth: '100vw' }}>
      <Container size="lg" py="xl">
        <Title order={1} ta="center" mb="lg" style={{ color: 'white' }}>
          Win Vault Privacy Policy
        </Title>
        <Text ta="center" mb="xl" style={{ color: 'white' }}>
          Last Updated: July 1, 2025
        </Text>

        <Divider my="md" />

        <Title order={2} mt="xl" mb="md" style={{ color: 'white' }}>
          1. Introduction
        </Title>
        <Text style={{ color: 'white' }}>
          Welcome to Win Vault, your trusted platform for e-commerce and lottery services. We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
        </Text>

        <Title order={2} mt="xl" mb="md" style={{ color: 'white' }}>
          2. Information We Collect
        </Title>
        <Text mb="sm" style={{ color: 'white' }}>
          We may collect the following types of information:
        </Text>
        <List withPadding style={{ color: 'white' }}>
          <List.Item>
            <Text style={{ color: 'white' }}><strong>Personal Information:</strong> Name, email address, phone number, billing and shipping address, payment information, and account credentials.</Text>
          </List.Item>
          <List.Item>
            <Text style={{ color: 'white' }}><strong>Lottery Participation Data:</strong> Information related to your participation in lotteries, such as ticket numbers and entry details.</Text>
          </List.Item>
          <List.Item>
            <Text style={{ color: 'white' }}><strong>Usage Data:</strong> Information about how you interact with our website, including IP address, browser type, pages visited, and time spent on the site.</Text>
          </List.Item>
          <List.Item>
            <Text style={{ color: 'white' }}><strong>Cookies and Tracking Technologies:</strong> We use cookies to enhance your experience, analyze site usage, and personalize content.</Text>
          </List.Item>
        </List>

        <Title order={2} mt="xl" mb="md" style={{ color: 'white' }}>
          3. How We Use Your Information
        </Title>
        <Text mb="sm" style={{ color: 'white' }}>
          We use your information to:
        </Text>
        <List withPadding style={{ color: 'white' }}>
          <List.Item>Process and fulfill e-commerce orders and lottery entries.</List.Item>
          <List.Item>Communicate with you about your account, orders, or lottery results.</List.Item>
          <List.Item>Improve our services, website functionality, and user experience.</List.Item>
          <List.Item>Send promotional offers, newsletters, or marketing materials (with your consent).</List.Item>
          <List.Item>Comply with legal obligations and prevent fraud.</List.Item>
        </List>

        <Title order={2} mt="xl" mb="md" style={{ color: 'white' }}>
          4. How We Share Your Information
        </Title>
        <Text style={{ color: 'white' }}>
          We do not sell your personal information. We may share your information with:
        </Text>
        <List withPadding style={{ color: 'white' }}>
          <List.Item>Third-party service providers (e.g., payment processors, shipping companies) to fulfill orders or services.</List.Item>
          <List.Item>Regulatory authorities to comply with legal requirements for lottery operations.</List.Item>
          <List.Item>Trusted partners for analytics or marketing purposes, with your consent.</List.Item>
        </List>

        <Title order={2} mt="xl" mb="md" style={{ color: 'white' }}>
          5. Data Security
        </Title>
        <Text style={{ color: 'white' }}>
          We implement industry-standard security measures to protect your data, including encryption and secure payment processing. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
        </Text>

        <Title order={2} mt="xl" mb="md" style={{ color: 'white' }}>
          6. Your Rights
        </Title>
        <Text style={{ color: 'white' }}>
          Depending on your location, you may have the following rights:
        </Text>
        <List withPadding style={{ color: 'white' }}>
          <List.Item>Access, correct, or delete your personal information.</List.Item>
          <List.Item>Opt out of marketing communications.</List.Item>
          <List.Item>Request data portability or restrict processing.</List.Item>
        </List>
        <Text style={{ color: 'white' }}>
          To exercise these rights, contact us at support@winvault.com.
        </Text>

        <Title order={2} mt="xl" mb="md" style={{ color: 'white' }}>
          7. Cookies and Tracking
        </Title>
        <Text style={{ color: 'white' }}>
          We use cookies to improve your experience. You can manage cookie preferences through your browser settings. Disabling cookies may affect website functionality.
        </Text>

        <Title order={2} mt="xl" mb="md" style={{ color: 'white' }}>
          8. Third-Party Links
        </Title>
        <Text style={{ color: 'white' }}>
          Our website may contain links to third-party sites. We are not responsible for their privacy practices. Please review their policies before providing personal information.
        </Text>

        <Title order={2} mt="xl" mb="md" style={{ color: 'white' }}>
          9. Changes to This Privacy Policy
        </Title>
        <Text style={{ color: 'white' }}>
          We may update this Privacy Policy to reflect changes in our practices or legal requirements. We will notify you of significant changes via email or website announcements.
        </Text>

        <Title order={2} mt="xl" mb="md" style={{ color: 'white' }}>
          10. Contact Us
        </Title>
        <Text style={{ color: 'white' }}>
          If you have questions about this Privacy Policy, please contact us at:
        </Text>
        <Text style={{ color: 'white' }}>
          <strong>Email:</strong> support@winvault.com<br />
          <strong>Address:</strong> Win Vault Inc., 123 Victory Lane, Suite 100, Commerce City, CA 90001
        </Text>

        <Space h="xl" />
        <Divider />
        <Text ta="center" mt="md" style={{ color: 'white' }}>
          © 2025 Win Vault. All rights reserved.
        </Text>
      </Container>
    </div>
  );
};