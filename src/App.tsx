import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Button } from 'react-native-paper';

import { DatePickerModal } from 'react-native-paper-dates';
import { Slider } from '@miblanchard/react-native-slider';

export const styles = StyleSheet.create({
    container: {
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        margin: 16,
        paddingBottom: 32,
    },
    sliderContainer: {
        paddingVertical: 16,
        width: 300,
    },
    titleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    vertical: {
      
    }
});

const SliderContainer = (props: {
    children: React.ReactElement;
    sliderValue?: Array<number>;
}) => {
    const {sliderValue} = props;
    const [value, setValue] = React.useState(sliderValue ? sliderValue : 0);

    const renderChildren = () => {
        return React.Children.map(
            props.children,
            (child: React.ReactElement) => {
                if (!!child && child.type === Slider) {
                    return React.cloneElement(child, {
                        onValueChange: setValue,
                        value
                    });
                }

                return child;
            },
        );
    };

    return (
        <View style={styles.sliderContainer}>
            <View style={styles.titleContainer}>
                <Text>{Array.isArray(value) ? value.join(' - ') : value}</Text>
            </View>
            {renderChildren()}
        </View>
    );
};

// Navigation bar
const RootStack = createNativeStackNavigator({
  screens: {
    Home: HomeScreen,
  },
});

function HomeScreen() {
  const [date, setDate] = React.useState(undefined);
  const [open, setOpen] = React.useState(false);

  const onDismissSingle = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = React.useCallback(
    (params: any) => {
      setOpen(false);
      setDate(params.date);
    },
    [setOpen, setDate]
  );

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>날짜 정하기</Text>
      <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
        <Button onPress={() => setOpen(true)} uppercase={false} mode="outlined">
          날짜 정하기
        </Button>
        <DatePickerModal
          locale="en"
          mode="single"
          visible={open}
          onDismiss={onDismissSingle}
          date={date}
          onConfirm={onConfirmSingle} />
      </View>
      
      <Text>시간 정하기</Text>
      <SliderContainer
        sliderValue={[0, 24]}>
        <Slider
          animateTransitions
          maximumTrackTintColor="#d3d3d3"
          maximumValue={24}
          minimumTrackTintColor="#1fb28a"
          minimumValue={0}
          step={1}
          thumbTintColor="#1a9274"
        />
      </SliderContainer>
    </View>
  );
}

const Navigation = createStaticNavigation(RootStack);

// Apps
export default function App() {
  return <Navigation />;
}
