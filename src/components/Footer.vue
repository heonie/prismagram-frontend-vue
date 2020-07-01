<template>
    <FooterContainer>
        <List>
            <ListItem>
                <LinkTag href="#">about us</LinkTag>
            </ListItem>
            <ListItem>
                <LinkTag href="#">support</LinkTag>
            </ListItem>
            <ListItem>
                <LinkTag href="#">press</LinkTag>
            </ListItem>
            <ListItem>
                <LinkTag href="#">api</LinkTag>
            </ListItem>
            <ListItem>
                <LinkTag href="#">jobs</LinkTag>
            </ListItem>
            <ListItem>
                <LinkTag href="#">privacy</LinkTag>
            </ListItem>
            <ListItem>
                <LinkTag href="#">terms</LinkTag>
            </ListItem>
            <ListItem>
                <LinkTag href="#">directory</LinkTag>
            </ListItem>
            <ListItem>
                <LinkTag href="#">profiles</LinkTag>
            </ListItem>
            <ListItem>
                <LinkTag href="#">hashtags</LinkTag>
            </ListItem>
            <ListItem>
                <LinkTag href="#">language</LinkTag>
            </ListItem>
        </List>
        <Copyright>Instaclone {{new Date().getFullYear()}} &copy;</Copyright>
    </FooterContainer>
</template>

<script>
import styled from 'vue-styled-components';

const FooterContainer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 12px;
  margin: 50px 0px;;
`;
const List = styled.ul`
  display: flex;
`;

const ListItem = styled.li`
  &:not(:last-child) {
    margin-right: 16px;
  }
`;

const LinkTag = styled.a`
  color: ${props => props.theme.darkBlueColor};
`;

const Copyright = styled.span`
  color: ${props => props.theme.darkGreyColor};
`;

export default {
    name: "Footer",
    components: {
        FooterContainer, List, ListItem, LinkTag, Copyright
    }
}
</script>

<style scoped lang="scss">

</style>