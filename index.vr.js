import React from 'react';
import {
    AppRegistry,
    asset,
    StyleSheet,
    Pano,
    Text,
    View,
    Animated,
    Box,
    AmbientLight,
    PointLight,
    Sphere,
    Model,
} from 'react-vr';

export default class WelcomeToVR extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bounceValue: new Animated.Value(0),
            spinValue: new Animated.Value(0),
        };
    }

    componentDidMount() {
        this.state.bounceValue.setValue(10.5);  // Start large
        this.state.spinValue.setValue(300);  // Start large
        Animated.spring(  // Base: spring, decay, timing
            this.state.bounceValue,  // Animate `bounceValue`
            { toValue: 0.5,  // Animate to smaller size
                friction: 1,  // Bouncier spring
            } ).start();  // Start the animation
        Animated.spring(
            this.state.spinValue,
            {
                toValue:0,
                friction: 1,
                tension:20,

            }).start();
    }

    calculateDistance(){
        return this.state.bounceValue-3;
    }

    render() {
        return (
            <View>
                <Pano source={asset('mountain.jpg')}/>
                <AmbientLight
                    intensity={0.2}
                    style={{
                        transform: [{translate: [0,0,-2]}]
                    }}
                />
                <Animated.View
                    style={{
                        transform: [{translate: [2,4,-3]}]
                    }}>
                <PointLight
                    intensity={1}
                />
                </Animated.View>
                <Animated.View
                    style={{
                    transform:[
                        {translate:[0,0,0]},
                        {rotateX:this.state.bounceValue}
                    ]
                }}>
                <Sphere
                    dimWidth={2}
                    dimDepth={2}
                    dimHeight={1}
                    lit={true}
                    style={{
                         color: 'salmon',
                         transform: [
                         {translate: [0, 0, -5]},
                        ],
                     }}/>
                </Animated.View>
                <Animated.View
                    style={{
                    transform:[
                        {translate: [0, -1, -5]},
                        {rotateX: this.state.spinValue}
                    ]
                }}>
                    <Model source={{ obj: asset('monkeyModel.obj'), mtl: asset('monkeyModel.mtl') }} lit={true} />
                </Animated.View>
            </View>
        );
    }
};

AppRegistry.registerComponent('WelcomeToVR', () => WelcomeToVR);
