import styled from 'styled-components/native';
import { CheckBox } from 'react-native-elements';
import Button from '../../components/Button';

export const Container = styled.SafeAreaView`
    flex: 1;
`;

export const Title = styled.Text`
    font-size: 20px;
    color: #fff;
    font-weight: bold;
    align-self: center;
    margin-top: 30px;
`;

export const Form = styled.ScrollView.attrs({
    showsVerticalScrollIndicator: false,
    contentContainerStyle: { padding: 30 }
})`
    align-self: stretch;
`;

export const CheckBoxStatus = styled(CheckBox).attrs({
    containerStyle: {
        marginTop: 40
    }
})``;

export const SubmitButton = styled(Button)`
    margin-top: 25px;
`;
