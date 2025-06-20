import { Group, Text } from "@mantine/core"
import { IconBrandFacebook, IconBrandInstagram, IconBrandLinkedin, IconBrandTwitter, IconBrandYoutube } from "@tabler/icons-react"


export const Footer = () => {
  return (
    <Group style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px' }}>
        <Group style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
            <Text>Copyright © 2024 <span style={{ fontWeight: 'bold'}}>Creative Code Tech</span></Text>
            <Text>Privacy Policy</Text>
            <Text>Terms & Conditions</Text>
            <Text>Contact</Text>
        </Group>
        <Group style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <IconBrandFacebook color="#A6A6A6"/>
            <IconBrandTwitter color="#A6A6A6"/>
            <IconBrandInstagram color="#A6A6A6"/>
            <IconBrandYoutube color="#A6A6A6"/>
            <IconBrandLinkedin color="#A6A6A6"/>
        </Group>
    </Group>
  )
}
