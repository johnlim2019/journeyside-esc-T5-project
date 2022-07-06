import { Paper, Space, Center, Text, Grid, createStyles, Button, ThemeIcon, Modal, TextInput, PasswordInput, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin } from 'tabler-icons-react';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { login, logout } from '../../services/UserDetailsSlice';

function NavBarSplashPage() {
    const useStyles = createStyles((theme) => ({
        navbar: {
            width: '60em',
            padding: '1em',
            margin: 'auto',
            // Media query with value from theme
            [`@media (max-width: ${theme.breakpoints.md}px)`]: {
                width: '100%',
            },
        },
        navbarContainer: {
            margin: 'auto',
            width: '100%',
            zIndex: 2
        }
    }));
    const USERNAME = "integrationTest";
    const currentUser = useAppSelector(state => state.UserDetailsReducer.userKey);
    const { classes } = useStyles();
    const [logIn, setLogIn] = useState(currentUser !== "" ? true : false);
    useEffect(() => {
        if (currentUser !== "") {
            setLogIn(true);
        }
    }, [currentUser]);

    const [logInModal, setLogInModal] = useState(false);
    const LOGIN = "Log in";
    const USERPROFILE = "User Profile";
    var buttonLabel = LOGIN;
    if (logIn === true) {
        buttonLabel = USERPROFILE;
    } else {
        buttonLabel = LOGIN;
    }
    const loginForm = useForm({
        initialValues: {
            userName: USERNAME,
            password: ""
        },
        validate: (values) => ({
            // regex validation
            password: (/^(?=.+\d)(?=.+[a-z])(?=.+[A-Z])(?=.+[a-zA-Z])(?=.+[^a-zA-Z0-9]).{8,}$/.test(values.password) ? null : "1 Uppercase, Symbol and Number"),
        })
    }
    )
    const dispatch = useAppDispatch(); // to add things to store!!!                                               
    const navigate = useNavigate();

    return (
        <>
            <Modal
                opened={logInModal}
                onClose={() => setLogInModal(false)}
                title='Log In'
            >
                <TextInput placeholder='User Name' {...loginForm.getInputProps('userName')}></TextInput>
                <Space h="lg"></Space>
                <PasswordInput placeholder='Password' {...loginForm.getInputProps('password')}></PasswordInput>
                <Space h="lg"></Space>
                <Group position={'apart'}>
                    <Button color={'pink'} onClick={() => {
                        loginForm.validate();
                        if (loginForm.validate().hasErrors === false) {
                            setLogInModal(false);
                        }
                    }}>Create Account</Button>
                    <Button onClick={() => {
                        alert("do something to validate login cred");
                        setLogInModal(false);
                        setLogIn(true);
                        dispatch(login({ userKey: loginForm.values.userName }))
                    }}>Log In</Button>
                </Group>
            </Modal>
            <Paper withBorder className={classes.navbarContainer}>
                <Grid columns={18} gutter='xs' p='sm' className={classes.navbar} >
                    <Grid.Col span={6}>
                        <Center>
                            <ThemeIcon variant='light'>
                                <MapPin />
                            </ThemeIcon>
                            <Space w="md" />
                            <Text style={{ paddingTop: 5, userSelect: 'none' }}>journeyside</Text>
                        </Center>
                    </Grid.Col>
                    <Grid.Col span={10}>
                        <Group position='apart'>
                            <Button variant='subtle' color='gray'
                                onClick={() => {
                                    navigate("/")
                                }}>Home</Button>
                            <Button variant='subtle' color='gray'
                                onClick={() => {
                                    navigate("/SearchResults")
                                }}>Search Results</Button>                                
                            <Button variant='subtle' color='gray'
                                onClick={() => {
                                    if (logIn === false) {
                                        setLogInModal(true);
                                    } else {
                                        navigate("/UserProfile")
                                    }
                                }}>{buttonLabel}</Button>
                            {logIn && <Button variant='subtle' color='pink'
                                onClick={() => {
                                    dispatch(logout());
                                    setLogIn(false);
                                    navigate("/")
                                }}>Log Out</Button>}
                        </Group>
                    </Grid.Col>
                </Grid>
            </Paper>
        </>

    )

} export default NavBarSplashPage