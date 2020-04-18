import React, { useState, useEffect } from 'react';
import Geolocation from '@react-native-community/geolocation';
import Background from '../../components/Background';

import { Container, Title, CheckBoxStatus, SubmitButton, Form } from './styles';

import api from '../../services/api';

export default function HealthProfile({ navigation }) {
    const [checkedGood, setCheckedGood] = useState(false);
    const [checkedSuspect, setCheckedSuspect] = useState(false);
    const [checkedBad, setCheckedBad] = useState(false);
    const [checkedGoodAgain, setCheckedGoodAgain] = useState(false);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

    useEffect(() => {
        async function loadInitialLocation() {
            Geolocation.requestAuthorization();

            Geolocation.getCurrentPosition(
                position => {
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
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
    }, []);

    async function handleSubmit() {
        let statusHealth;

        if (checkedGood) {
            statusHealth = 1;
        }

        if (checkedSuspect) {
            statusHealth = 2;
        }

        if (checkedBad) {
            statusHealth = 3;
        }

        if (checkedGoodAgain) {
            statusHealth = 4;
        }

        const response = await api.post('user-location', {
            name: 'Tiago',
            user_health: statusHealth,
            latitude,
            longitude
        });

        if (response) {
            navigation.navigate('Mapa');
        }
    }
    return (
        <Background>
            <Container>
                <Title>Olá, Tiago. Como está sua Saúde?</Title>
                <Form>
                    <CheckBoxStatus
                        center
                        title="Estou bem, sem sintomas"
                        checked={checkedGood}
                        onIconPress={() => setCheckedGood(!checkedGood)}
                        onPress={() => setCheckedGood(!checkedGood)}
                    />
                    <CheckBoxStatus
                        center
                        title="Estou com suspeita"
                        checked={checkedSuspect}
                        onIconPress={() => setCheckedSuspect(!checkedSuspect)}
                        onPress={() => setCheckedSuspect(!checkedSuspect)}
                    />

                    <CheckBoxStatus
                        center
                        title="Estou confirmado com Covid"
                        checked={checkedBad}
                        onIconPress={() => setCheckedBad(!checkedBad)}
                        onPress={() => setCheckedBad(!checkedBad)}
                    />
                    <CheckBoxStatus
                        center
                        title="Já Tive e já estou curado"
                        checked={checkedGoodAgain}
                        onIconPress={() =>
                            setCheckedGoodAgain(!checkedGoodAgain)
                        }
                        onPress={() => setCheckedGoodAgain(!checkedGoodAgain)}
                    />

                    <SubmitButton onPress={handleSubmit}>
                        Confirmar
                    </SubmitButton>
                </Form>
            </Container>
        </Background>
    );
}
