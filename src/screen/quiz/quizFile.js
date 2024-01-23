import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import LoadingButton from '../../components/CustomButton/loadingButton';
import { layoutPadding } from '../../components/Layout/layoutStyle';
import Typography from '../../components/Typography';
import { verticalScale } from '../../lib/utils';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import palette from '../../theme/palette';

const QuizData = {

    1: {
        question: 'What is the capital of France?',
        answers: [
            { id: 1, text: 'Berlin' },
            { id: 2, text: 'Paris' },
            { id: 3, text: 'Madrid' },
            { id: 4, text: 'Rome' },
        ],
        correctAnswer: 'Paris',
    },

    2: {
        question: 'Which planet is known as the Red Planet?',
        answers: [
            { id: 1, text: 'Earth' },
            { id: 2, text: 'Mars' },
            { id: 3, text: 'Jupiter' },
            { id: 4, text: 'Venus' },
        ],
        correctAnswer: 'Mars',
    },

    3: {
        question: 'Who wrote the play "Romeo and Juliet"?',
        answers: [
            { id: 1, text: 'William Shakespeare' },
            { id: 2, text: 'Jane Austen' },
            { id: 3, text: 'Charles Dickens' },
            { id: 4, text: 'Leo Tolstoy' },
        ],
        correctAnswer: 'William Shakespeare',
    },

    4: {
        question: 'What is the largest mammal on Earth?',
        answers: [
            { id: 1, text: 'Elephant' },
            { id: 2, text: 'Blue Whale' },
            { id: 3, text: 'Giraffe' },
            { id: 4, text: 'Hippopotamus' },
        ],
        correctAnswer: 'Blue Whale',
    },

    5: {
        question: 'In which year did the Titanic sink?',
        answers: [
            { id: 1, text: '1905' },
            { id: 2, text: '1912' },
            { id: 3, text: '1920' },
            { id: 4, text: '1931' },
        ],
        correctAnswer: '1912',
    },

    6: {
        question: 'What is the main ingredient in guacamole?',
        answers: [
            { id: 1, text: 'Tomato' },
            { id: 2, text: 'Avocado' },
            { id: 3, text: 'Onion' },
            { id: 4, text: 'Pepper' },
        ],
        correctAnswer: 'Avocado',
    },

    7: {
        question: 'Who painted the Mona Lisa?',
        answers: [
            { id: 1, text: 'Vincent van Gogh' },
            { id: 2, text: 'Leonardo da Vinci' },
            { id: 3, text: 'Pablo Picasso' },
            { id: 4, text: 'Claude Monet' },
        ],
        correctAnswer: 'Leonardo da Vinci',

    },

    8: {
        question: 'Which gas do plants absorb from the atmosphere?',
        answers: [
            { id: 1, text: 'Oxygen' },
            { id: 2, text: 'Nitrogen' },
            { id: 3, text: 'Carbon Dioxide' },
            { id: 4, text: 'Hydrogen' },
        ],
        correctAnswer: 'Carbon Dioxide',
    },

    9: {
        question: 'What is the currency of Japan?',
        answers: [
            { id: 1, text: 'Won' },
            { id: 2, text: 'Yuan' },
            { id: 3, text: 'Yen' },
            { id: 4, text: 'Ringgit' },
        ],
        correctAnswer: 'Yen',
    },

    10: {
        question: 'Which element has the chemical symbol "H"?',
        answers: [
            { id: 1, text: 'Helium' },
            { id: 2, text: 'Hydrogen' },
            { id: 3, text: 'Hassium' },
            { id: 4, text: 'Hafnium' },
        ],
        correctAnswer: 'Hydrogen',
    }
};

const DataLength = Object.keys(QuizData).length;

function QuizFile() {
    const [currentStep, setCurrentStep] = useState(1);
    currentQuizz = QuizData?.[currentStep];
    
    const [selectedAnswer, setSelectedAnswer] = useState({});
    const progress = (currentStep / DataLength) * 100;

    const handelPress = ({item,currentStep}) => {
        setSelectedAnswer(pre=>({...pre,[currentStep]:item.id}));
        // console.log({[currentStep]:item.id});
   };
   console.log(selectedAnswer);

    return (
        <ScrollView style={{
            ...layoutPadding,
        }}>
            <View>
                <View style={{ alignItems: 'flex-end', marginTop: verticalScale(20) }}>
                    <LoadingButton
                        id="submit-button"
                        size="medium"
                        type="submit"
                        label="Submit"
                        disabled={currentStep < DataLength}
                        style={{ marginTop: verticalScale(20), borderRadius: 30, width: 200, }}
                    />
                </View>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: verticalScale(40),
                }}>
                    <AnimatedCircularProgress
                        size={200}
                        width={8}
                        fill={progress}
                        tintColor={palette.text.main}
                    >
                        {(fill) => (
                            <Typography>
                                {currentStep}/{DataLength} Questions
                            </Typography>
                        )}
                    </AnimatedCircularProgress>
                </View>
                <View style={{ marginTop: verticalScale(20) }}>
                    <View style={{ marginTop: verticalScale(10) }}>
                        <Typography variant="titleMedium">
                            Question {currentStep} of {DataLength}
                        </Typography>
                    </View>
                    <View style={{ marginTop: verticalScale(10) }}>
                        <Typography variant="titleLarge" >
                            {currentQuizz.question}
                        </Typography>
                    </View>
                    <View>
                        {currentQuizz.answers.map((item, index) => {
                            return <View
                                key={index}
                                style={{
                                    marginTop: verticalScale(20),
                                    borderWidth: .5,
                                    padding: 20,
                                    borderRadius: 30,
                                    backgroundColor: selectedAnswer?.[currentStep] === item?.id ? palette.background.main : 'transparent',
                                }}>

                                <Typography
                                    variant="titleMedium"
                                    onPress={() => handelPress({item,currentStep})}
                                >
                                    {item?.text}
                                </Typography>
                            </View>
                        })}
                    </View>
                </View>

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 30
                }}>
                    <LoadingButton
                        id="submit-button"
                        size="medium"
                        type="submit"
                        disabled={currentStep === 1}
                        label="Prev"
                        onPress={() => setCurrentStep(pre => pre - 1)}
                        style={{ marginTop: verticalScale(40), borderRadius: 30, width: 200, }}
                    />
                    <LoadingButton
                        id="submit-button"
                        size="medium"
                        type="submit"
                        label="Next"
                        disabled={currentStep === DataLength}
                        onPress={() => setCurrentStep(pre => pre + 1)}
                        style={{ marginTop: verticalScale(40), borderRadius: 30, width: 200, }} />
                </View>
            </View>
        </ScrollView>
    )
}
export default QuizFile
