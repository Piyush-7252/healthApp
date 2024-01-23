import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { Modal, PaperProvider, Portal } from 'react-native-paper';
import Typography from 'src/components/Typography';
import LoadingButton from '../../components/CustomButton/loadingButton';
import { Icon } from '../../components/icon';
import { verticalScale } from '../../lib/utils';
import palette from '../../theme/palette';

const JoinMeeting = () => {
    const [visible, setVisible] = React.useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = { backgroundColor: 'white', padding: 30 };

    const UserLists = [
        {
            icon: <Icon name="user" style={{ fontSize: 30, color: palette.background.main }} />,
            name: 'Anna Peterson',
            Designation: 'Design',
        },

        {
            icon: <Icon name="user" style={{ fontSize: 30, color: palette.background.main }} />,
            name: 'Jimmy Fallon',
            Designation: 'HR',
        },
        {
            icon: <Icon name="user" style={{ fontSize: 30, color: palette.background.main }} />,
            name: 'Leslie Schneider',
            Designation: 'Engineer',
        },
    ];

    const titles = [
        { name: 'Event' },
        { name: 'Task' },
        { name: 'Out of office' },
    ];

    const aboutMeeting = [
        {
            icon: <Icon name="clock-o" style={{ fontSize: 30, color: palette.background.main }} />,
            text: 'Monday, December 12-4:30 pm',
        },
        {
            icon: <Icon name="video-camera" style={{ fontSize: 25, color: palette.background.main }} />,
            text: 'Join with video',
        },
        {
            icon: <Icon name="file-text-o" style={{ fontSize: 25, color: palette.background.main }} />,
            text: 'Add meeting notes or attachments',
        },
    ];
    const bttn = [
        {
            button: <LoadingButton
                id="submit-button"
                size="medium"
                type="submit"
                onPress={() => { }}
                textColor="white"
                label="Delete"
                style={{ marginTop: verticalScale(10), borderRadius: 20, backgroundColor: palette.background.main, width:200, }}
            />
        },
        {
            button: <LoadingButton
                id="submit-button"
                size="medium"
                type="submit"
                onPress={() => { }}
                textColor="white"
                label="Edit"
                style={{ marginTop: verticalScale(10), borderRadius: 20, backgroundColor: palette.background.main, width:200 }}
            />
        },
    ];
    return (
        <PaperProvider >
            <Portal >
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle} >
                    <ScrollView >
                        <View>
                            <View style={{
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                flexDirection: 'row',
                            }}>
                                <Typography variant="titleMedium">Weekly Design Sprint Meeting</Typography>
                                <Icon name="times" style={{ fontSize: 20, color: palette.background.main }} onPress={hideModal} />
                            </View>
                            <View style={{
                                marginTop: verticalScale(20),
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                flexDirection: 'row',
                                gap:10,
                            }}>
                                {titles.map((item, index) => (
                                    <View style={{
                                        borderRadius: 10,
                                        backgroundColor: palette.background.main,
                                        padding:verticalScale(5),
                                        paddingLeft:verticalScale(25),
                                        paddingRight:verticalScale(25),
                                    }} key={index}>
                                        <Typography style={{
                                            color: palette.text.paper,
                                        }} variant="titleMedium">{item?.name}</Typography>
                                    </View>
                                ))}
                            </View>
                            <View style={{
                                marginTop: verticalScale(20),
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                                <View>
                                    <Icon name="users" style={{ fontSize: 30, color: palette.background.main }} />
                                </View>
                                <View>
                                    <Typography variant='titleMedium' style={{ marginLeft: verticalScale(10) }}>3 guests</Typography>
                                </View>
                            </View>

                            <View style={{ marginTop: verticalScale(20) }}>
                                {UserLists.map((item, index) => (
                                    <View style={{
                                        justifyContent: 'space-between',
                                        marginBottom: verticalScale(10),
                                        flexDirection: 'row',
                                        backgroundColor: palette.background.accentBlue,
                                        borderRadius: 10,
                                        padding: 10,
                                    }} key={index}>
                                        <View style={{
                                            flexDirection: 'row',
                                            gap: 10,
                                        }}>
                                            <View>
                                                {item?.icon}
                                            </View>

                                            <Typography >{item?.name}</Typography>
                                        </View>

                                        <View style={{
                                            padding: 5, borderRadius: 10, backgroundColor: palette.background.main,
                                        }}>
                                            <Typography style={{
                                                color: palette.text.paper,
                                            }} >{item?.Designation}</Typography>
                                        </View>
                                    </View>
                                ))}
                            </View>

                            <View style={{
                                marginTop: verticalScale(5),
                            }} >
                                {aboutMeeting.map((item, index) => (
                                    <View style={{
                                        marginTop: verticalScale(10),
                                        flexDirection: 'row',
                                        gap: 10,
                                    }} key={index}>
                                        <View>{item?.icon}</View>
                                        <View><Typography>{item?.text}</Typography></View>
                                    </View>
                                ))}
                            </View>

                            <View style={{
                                marginTop: verticalScale(20),
                                flexDirection: 'row',
                                gap: 20,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                {bttn.map((item, index) =>
                                    <View key={index}>
                                        {item?.button}
                                    </View>
                                )}
                            </View>
                        </View>
                    </ScrollView>
                </Modal>
            </Portal>
            <LoadingButton
                id="submit-button"
                size="medium"
                type="submit"
                onPress={showModal}
                label="show"
                textColor="white"
                style={{
                    marginTop: verticalScale(30), borderRadius: 30, borderRadius: 20, backgroundColor: palette.background.main,
                }}
            />
        </PaperProvider>
    );
};

export default JoinMeeting;