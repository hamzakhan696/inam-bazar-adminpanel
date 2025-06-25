import { Group, Text } from "@mantine/core";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconBrandYoutube,
} from "@tabler/icons-react";

export const Footer = () => {
  const isMobile = window.innerWidth <= 768;

  return (
    <Group
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: isMobile ? "center" : "space-between",
        flexDirection: isMobile ? "column" : "row",
        padding: "20px",
        gap: isMobile ? "15px" : "0",
      }}
    >
      <Group
        style={{
          display: "flex",
          alignItems: "center",
          gap: "25px",
          flexDirection: isMobile ? "column" : "row",
        }}
      >
        <Text>
          Copyright © 2024{" "}
          <span style={{ fontWeight: "bold" }}>Creative Code Tech</span>
        </Text>
        <Text>Privacy Policy</Text>
        <Text>Terms & Conditions</Text>
        <Text>Contact</Text>
      </Group>
      <Group
        style={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
        }}
      >
        <IconBrandFacebook color="#A6A6A6" />
        <IconBrandTwitter color="#A6A6A6" />
        <IconBrandInstagram color="#A6A6A6" />
        <IconBrandYoutube color="#A6A6A6" />
        <IconBrandLinkedin color="#A6A6A6" />
      </Group>
    </Group>
  );
};