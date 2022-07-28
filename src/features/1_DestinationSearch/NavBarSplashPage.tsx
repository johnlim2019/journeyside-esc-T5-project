import { Stack, Paper, Space, Center, Text, Grid, createStyles, Button, ThemeIcon, Modal, TextInput, PasswordInput, Group, Burger, Drawer, useMantineTheme } from '@mantine/core';
import { useForm } from '@mantine/form';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { login, logout } from '../../services/UserDetailsSlice';
import { isLetter, isNotPrinting, isNumber, isSymbol, isWhitespace } from "../../services/regex";

const userApi = 'https://ascendas-userdata-server.herokuapp.com/api/users';

function NavBarSplashPage() {
    const logoFontWeight = '300';
    const useStyles = createStyles((theme) => ({
        navbar: {
            width: '50em',
            padding: '1em',
            margin: 'auto',
            // Media query with value from theme
        },
        navbarMobile: {
            // Media query with value from theme
            display: 'flex',
            margin: 'auto',
            padding: '1em'

        },
        navbarContainer: {
            width: '100%',
        }
    }));
    const USERNAME = "mongoDbIntegrationTest";
    const DEFAULTPASSWORD = "abcdef@1G";
    const currentUser = useAppSelector(state => state.UserDetailsReducer.userKey);
    const { classes } = useStyles();
    const [logIn, setLogIn] = useState(currentUser !== "" ? true : false);
    const [isLoadingLog, setIsLoadingLog] = useState(false);
    const [isLoadingReg, setIsLoadingReg] = useState(false);

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
            password: DEFAULTPASSWORD
        },
        validate: (values) => ({
            // regex validation
            userName: (values.userName.length < 8 || values.userName.length > 25 ? "Username must be between 8 to 25 characters." 
            : values.userName.match(isNotPrinting) || values.userName.match(isWhitespace) ? "Invalid Character" : null),
            password: ( values.password.length < 8 ? "Password at least 8 characters" 
            : values.password.length > 100 ? "Password is too long" 
            : isNotPrinting.test(values.password) ? "Invalid Characters":
            isNumber.test(values.password) && isSymbol.test(values.password) && isLetter.test((values.password)) ? null: "Need 1 symbol, 1 number, 1 letter" ) 
        })
    }
    )
    const dispatch = useAppDispatch(); // to add things to store!!!                                               
    const navigate = useNavigate();

    const [openNav, setOpenNav] = useState<boolean>(false);

    const BREAKPOINT = useMantineTheme().breakpoints.sm;
    // check window size
    function getWindowSize() {
        const { innerWidth, innerHeight } = window;
        return { innerWidth, innerHeight };
    }
    const [windowSize, setWindowSize] = useState(getWindowSize());
    useEffect(() => {
        function handleWindowResize() {
            setWindowSize(getWindowSize());
        }
        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);
    const [loginErr, setLogInErr] = useState<String>("");

    return (
        <>
            <Drawer
                opened={openNav}
                onClose={() => setOpenNav(false)}
                padding="sm"
                size="sm"
                overlayOpacity={0.55}
                overlayBlur={3}
                className="NavBarDrawer"
            >
                <Stack>
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
                </Stack>
            </Drawer>
            <Modal
                opened={logInModal}
                onClose={() => setLogInModal(false)}
                title='Log In'
                className="LogInModal"
            >
                <TextInput onFocus={() => { loginForm.validate() }} onBlur={() => { loginForm.validate() }} placeholder='User Name' {...loginForm.getInputProps('userName')}></TextInput>
                <Space h="lg"></Space>
                <PasswordInput onFocus={() => { loginForm.validate() }} onBlur={() => { loginForm.validate() }} placeholder='Password' {...loginForm.getInputProps('password')}></PasswordInput>
                <Space h="lg"></Space>

                <Group position={'apart'}>
                    <Button loading={isLoadingReg} color={'pink'} onClick={() => {
                        setLogInErr("");
                        if (loginForm.validate().hasErrors === false) {
                            setIsLoadingReg(true);
                            const registerUserApi = async (api: string) => {
                                await axios.post(api + "/register", { "username": loginForm.values.userName, "password": loginForm.values.password }
                                ).then((response) => {
                                    const data = response.data as object[];
                                    console.log(data);
                                    setIsLoadingReg(false);
                                    setLogInModal(false);
                                }).catch(errors => {
                                    console.error(errors);
                                    setLogInErr("*User already exits");
                                    setIsLoadingReg(false);
                                });
                            };
                            registerUserApi(userApi);
                        }
                    }}>Create Account</Button>
                    <Button loading={isLoadingLog} loaderPosition="right" onClick={() => {
                        setLogInErr("");
                        const loginUserApi = async (api: string) => {
                            if (loginForm.validate().hasErrors === false) {
                                setIsLoadingLog(true);
                                await axios.post(api + "/login", { "username": loginForm.values.userName, "password": loginForm.values.password }
                                ).then((response) => {
                                    const data = response.data;
                                    const accessToken = data["token"];
                                    console.log(data);
                                    console.log(accessToken);
                                    setLogInModal(false);
                                    setLogIn(true);
                                    setIsLoadingLog(false);
                                    dispatch(login({ userKey: loginForm.values.userName, sessionKey: accessToken }));
                                }).catch(errors => {
                                    console.error(errors);
                                    setIsLoadingLog(false);
                                    setLogInErr("*Password or Username is Invalid");
                                });
                            }
                        };
                        loginUserApi(userApi);
                    }}>Log In</Button>
                </Group>
                <Text color={'red'}>{loginErr}</Text>
            </Modal>

            {(windowSize.innerWidth < BREAKPOINT) && <div className="NarrowNavBar">
                <Paper withBorder className={classes.navbarContainer}>
                    <Grid columns={18} gutter='xs' p='sm' className={classes.navbarMobile} >
                        <Grid.Col span={1}>
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <Center>
                                <ThemeIcon variant='outline' color={'gray'} size='md'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px" baseProfile="basic"><path fill="#f7df1e" d="M6,42V6h36v36H6z" /><path fill="#000001" d="M29.538,32.947c0.692,1.124,1.444,2.201,3.037,2.201c1.338,0,2.04-0.665,2.04-1.585 c0-1.101-0.726-1.492-2.198-2.133l-0.807-0.344c-2.329-0.988-3.878-2.226-3.878-4.841c0-2.41,1.845-4.244,4.728-4.244 c2.053,0,3.528,0.711,4.592,2.573l-2.514,1.607c-0.553-0.988-1.151-1.377-2.078-1.377c-0.946,0-1.545,0.597-1.545,1.377 c0,0.964,0.6,1.354,1.985,1.951l0.807,0.344C36.452,29.645,38,30.839,38,33.523C38,36.415,35.716,38,32.65,38 c-2.999,0-4.702-1.505-5.65-3.368L29.538,32.947z M17.952,33.029c0.506,0.906,1.275,1.603,2.381,1.603 c1.058,0,1.667-0.418,1.667-2.043V22h3.333v11.101c0,3.367-1.953,4.899-4.805,4.899c-2.577,0-4.437-1.746-5.195-3.368 L17.952,33.029z" /></svg>
                                </ThemeIcon>
                                <Button compact variant='subtle' color='gray' style={{ zIndex: '5', fontWeight: logoFontWeight, marginLeft: '5px' }}
                                    onClick={() => {
                                        navigate("/")
                                    }}>journeyside</Button>
                            </Center>
                        </Grid.Col>
                        <Grid.Col span={9}>
                        </Grid.Col>
                        <Grid.Col span={1}>
                            <Burger id='Burger' style={{ zIndex: '5' }} size='sm' opened={openNav} onClick={() => { setOpenNav(!openNav) }} ></Burger>
                        </Grid.Col>
                    </Grid>
                </Paper>
            </div>}
            {(windowSize.innerWidth >= BREAKPOINT) && <div className="FullNavBar">
                <Paper withBorder className={classes.navbarContainer}>
                    <Grid columns={18} gutter='xs' p='sm' className={classes.navbar} >
                        <Grid.Col span={4}>
                            <Center>
                                <ThemeIcon variant='outline' color={'gray'} size='md'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px" baseProfile="basic"><path fill="#f7df1e" d="M6,42V6h36v36H6z" /><path fill="#000001" d="M29.538,32.947c0.692,1.124,1.444,2.201,3.037,2.201c1.338,0,2.04-0.665,2.04-1.585 c0-1.101-0.726-1.492-2.198-2.133l-0.807-0.344c-2.329-0.988-3.878-2.226-3.878-4.841c0-2.41,1.845-4.244,4.728-4.244 c2.053,0,3.528,0.711,4.592,2.573l-2.514,1.607c-0.553-0.988-1.151-1.377-2.078-1.377c-0.946,0-1.545,0.597-1.545,1.377 c0,0.964,0.6,1.354,1.985,1.951l0.807,0.344C36.452,29.645,38,30.839,38,33.523C38,36.415,35.716,38,32.65,38 c-2.999,0-4.702-1.505-5.65-3.368L29.538,32.947z M17.952,33.029c0.506,0.906,1.275,1.603,2.381,1.603 c1.058,0,1.667-0.418,1.667-2.043V22h3.333v11.101c0,3.367-1.953,4.899-4.805,4.899c-2.577,0-4.437-1.746-5.195-3.368 L17.952,33.029z" /></svg>
                                </ThemeIcon>
                                <Button compact variant='subtle' color='gray' style={{ zIndex: '5', fontWeight: logoFontWeight, marginLeft: '5px' }}
                                    onClick={() => {
                                        navigate("/")
                                    }}>journeyside</Button>
                            </Center>
                        </Grid.Col>
                        <Grid.Col span={14} >
                            <Group position='right' spacing={30}>
                                <Button variant='subtle' color='gray' style={{ zIndex: '5' }}
                                    onClick={() => {
                                        navigate("/SearchResults")
                                    }}>Search Results</Button>
                                <Button variant='subtle' color='gray' style={{ zIndex: '5' }}
                                    onClick={() => {
                                        if (logIn === false) {
                                            setLogInModal(true);
                                        } else {
                                            navigate("/UserProfile")
                                        }
                                    }}>{buttonLabel}</Button>
                                {logIn && <Button variant='subtle' color='pink' style={{ zIndex: '5' }}
                                    onClick={() => {
                                        dispatch(logout());
                                        setLogIn(false);
                                        navigate("/")
                                    }}>Log Out</Button>}
                            </Group>
                        </Grid.Col>
                    </Grid>
                </Paper>
            </div>}


        </>

    )

} export default NavBarSplashPage