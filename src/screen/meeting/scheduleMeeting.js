/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-hooks/exhaustive-deps */
import { useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import Typography from 'src/components/Typography';
import CustomForm from 'src/components/form';
import LoadingButton from '../../components/CustomButton/loadingButton';
import Header from '../../components/Layout/header';
import { layoutPadding } from '../../components/Layout/layoutStyle';
import { requiredField } from '../../lib/constants';
import { verticalScale } from '../../lib/utils';
import palette from '../../theme/palette';

export const loginFormGroups = [
    {
        inputType: 'text',
        type: 'text',
        name: 'Name',
        textLabel: 'Name',
        required: requiredField,
        containerStyle: { marginBottom: '1.875rem' },
    },

    {
        inputType: 'text',
        type: 'text',
        name: 'description',
        textLabel: 'Description',
        required: requiredField,
        containerStyle: { marginBottom: '1.875rem' },
    },

    {
        inputType: 'date',
        type: 'text',
        name: 'When',
        textLabel: 'When',
        required: requiredField,
        containerStyle: { marginBottom: '1.875rem' },
    },

    {
        inputType: 'timePicker',
        type: 'text',
        name: 'time',
        textLabel: 'Time',
        required: requiredField,
        containerStyle: { marginBottom: '1.875rem' },
    },

    {
        inputType: 'wiredSelect',
        type: 'text',
        name: 'members',
        textLabel: 'Members',
        required: requiredField,
        containerStyle: { marginBottom: '1.875rem' },
        options:[
            {_id: 1, value: 'Piyush'},
            {_id: 2, value: 'Aman'},
            {_id: 3, value: 'Sekhar'},
            {_id: 4, value: 'AnotherName'},
            {_id: 5, value: 'YetAnotherName'},
          ],
          multiple: true,
    },
];

let selectedRole;
const ScheduleMeeting = ({} = {}) => {
    
    const form = useForm({ mode: 'onChange' });

    return (
        <ScrollView
            style={{
                flex: 1,
                backgroundColor: palette.background.default,
                ...layoutPadding,
            }}>
            <View>
                <Header />
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: verticalScale(50),
                    }}>
                    <Typography variant="headlineLarge" style={{fontWeight:800}}>Schedule Meeting</Typography>
                </View>
                <View style={{ marginTop: verticalScale(50) }}>
                    <CustomForm
                        formGroups={loginFormGroups}
                        columnsPerRow={1}
                        form={form}
                    />
                    <LoadingButton
                        id="submit-button"
                        size="medium"
                        type="submit"
                        onPress={()=>{}}
                        label="Create Meeting"
                        style={{ marginTop: verticalScale(40), borderRadius: 30}}
                    />
                </View>
            </View>
        </ScrollView>
    );
};

export default ScheduleMeeting;
