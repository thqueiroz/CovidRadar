import React, { useEffect, useState } from 'react';
import { Marker, Callout } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../../services/api';

import { MapContainer, Container, TextTitle, TextInfo } from './styles';

export default function Main() {
    const [users, setUsers] = useState([]);
    const [currentRegion, setCurrentRegion] = useState(null);

    useEffect(() => {
        async function loadInitialLocation() {
            Geolocation.requestAuthorization();

            Geolocation.getCurrentPosition(
                position => {
                    setCurrentRegion({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: 0.04,
                        longitudeDelta: 0.04
                    });
                },
                error => {
                    console.tron.warn(error);
                },
                {
                    enableHighAccuracy: false,
                    timeout: 200000,
                    maximumAge: 1000
                }
            );
        }

        loadInitialLocation();
    }, [currentRegion]);

    function getStatusHealthText(status) {
        if (status === 1) {
            return 'Saudável';
        }

        if (status === 2) {
            return 'Caso suspeito';
        }

        if (status === 3) {
            return 'Caso Confirmado';
        }

        if (status === 4) {
            return 'Caso curado';
        }
    }

    function getStatusHealthColor(status) {
        if (status === 1) {
            return 'green';
        }

        if (status === 2) {
            return 'yellow';
        }

        if (status === 3) {
            return 'red';
        }

        if (status === 4) {
            return 'green';
        }
    }

    useState(() => {
        async function loadUsers() {
            const response = await api.get('user-location');

            if (response) {
                setUsers(response.data);
            }
        }

        loadUsers();
    }, [users]);

    function handleRegionChange(region) {
        setCurrentRegion(region);
    }

    if (!currentRegion) {
        return null;
    }

    return (
        <>
            <MapContainer
                onRegionChangeComplete={handleRegionChange}
                initialRegion={currentRegion}
            >
                {users.map(user => (
                    <Marker
                        key={users.id}
                        coordinate={{
                            latitude: user.location.coordinates[1],
                            longitude: user.location.coordinates[0]
                        }}
                    >
                        <Icon
                            name="room"
                            size={40}
                            color={getStatusHealthColor(user.user_health)}
                        />

                        <Callout onPress={() => {}}>
                            <Container>
                                <TextTitle>{user.name}</TextTitle>
                                <TextInfo>
                                    Status de Saúde:{' '}
                                    {getStatusHealthText(user.user_health)}
                                </TextInfo>
                            </Container>
                        </Callout>
                    </Marker>
                ))}
            </MapContainer>
        </>
    );
}
