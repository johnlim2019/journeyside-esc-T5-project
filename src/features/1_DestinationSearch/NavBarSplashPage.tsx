import { Stack, Paper, Space, Center, Text, Grid, createStyles, Button, ThemeIcon, Modal, TextInput, PasswordInput, Group, Burger, Drawer, useMantineTheme } from '@mantine/core';
import { useForm } from '@mantine/form';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { login, logout } from '../../services/UserDetailsSlice';
import { isEmoji, isLetter, isNotPrinting, isNumber, isSymbol, isWhitespace } from "../../services/regex";
import { IconBrandJavascript } from '@tabler/icons';

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
    interface loginFormInterface{
        userName: string,
        password: string
    }

    const loginForm = useForm<loginFormInterface>({
        initialValues: {
            userName: USERNAME,
            password: DEFAULTPASSWORD
        },
        validate: (values) => ({
            // regex validation
            userName: (values.userName.length < 7 || values.userName.length > 25 ? "Username must be between 7 to 25 characters." 
            : values.userName.match(isNotPrinting) || values.userName.match(isWhitespace) ? "Invalid Character" : null),
            password: ( values.password.length < 8 ? "Password at least 8 characters" 
            : values.password.length > 100 ? "Password is too long" 
            : isNotPrinting.test(values.password) || isEmoji.test(values.password) ? "Invalid Characters":
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
                                await axios.post(api + "/register", { "username": loginForm.values.userName, "password": loginForm.values.password }, {headers: { 'Content-Type': 'application/json'}, withCredentials: true}
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
                                await axios.post(api + "/login", { "username": loginForm.values.userName, "password": loginForm.values.password }, {headers: { 'Content-Type': 'application/json'}, withCredentials: true}
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

                    <Grid justify="space-between" columns={12} gutter='xs' p='sm' className={classes.navbarMobile} >
                        <Grid.Col span={4}>
                            <Button 
                                color='yellow' radius={32}
                                variant='subtle'
                                leftIcon={<img width="18" alt="Journeyside Icon" src="./favicon.ico"></img>} 
                                style={{ zIndex: '5', color:'#d97700', fontWeight:logoFontWeight }}
                                onClick={() => {
                                    navigate("/")
                                }}>journeyside</Button>
                        </Grid.Col>
                        <Grid.Col span={2}>
                            <Burger id='Burger' style={{ zIndex: '5', float:'right' }} opened={openNav} onClick={() => { setOpenNav(!openNav) }} ></Burger>
                        </Grid.Col>
                    </Grid>
                </Paper>
            </div>}
            {(windowSize.innerWidth >= BREAKPOINT) && <div className="FullNavBar">
                <Paper withBorder className={classes.navbarContainer}>
                    <Grid columns={18} gutter='xs' p='sm' className={classes.navbar} >
                        <Grid.Col span={4}>
                            <Button 
                                color='yellow' radius={5}
                                variant='subtle'
                                leftIcon={<img width="18" alt="Journeyside Icon" src="./favicon.ico"></img>} 
                                style={{ zIndex: '5', color:'#d97700', fontWeight:logoFontWeight }}
                                onClick={() => {
                                    navigate("/")
                                }}>journeyside</Button>
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