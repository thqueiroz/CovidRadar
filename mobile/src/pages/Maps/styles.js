import styled from 'styled-components/native';
import MapView from 'react-native-maps';

export const MapContainer = styled(MapView)`
    flex: 1;
`;

export const Image = styled.Image`
    width: 54px;
    height: 54px;
    border-radius: 4px;
    border-width: 4px;
    border-color: #000;
`;

export const Container = styled.View`
    width: 260px;
`;

export const TextTitle = styled.Text`
    font-weight: bold;
    font-size: 16px;
`;

export const TextInfo = styled.Text`
    color: #666;
    margin-top: 5px;
`;
