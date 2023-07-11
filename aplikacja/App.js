import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import Toast from "react-native-toast-message";

const App = () => {
	const [randomNumber, setRandomNumber] = useState(null);
	const [disabled, setDisabled] = useState(true);
	const generateRandomNumber = () => {
		const min = 95;
		const max = 100;
		const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
		setRandomNumber(randomNum);
	};

	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
				backgroundColor: "lightblue",
			}}
		>
			<Text
				style={{
					fontSize: 40,
					marginBottom: 100,
					marginTop: 10,
					color: "darkblue",
					textAlign: "center",
				}}
			>
				Mobilny pulsooksymetr
			</Text>
			<Button
				title="Połącz z urządzeniem"
				onPress={() => {
					setDisabled(false)
					Toast.show({
						type: "info",
						text1: "Połączono",
						visibilityTime: 2000, // Czas widoczności toastu w milisekundach
					});
				}}
			/>
			<Text
				style={{
					fontSize: 17,
					marginBottom: 20,
					marginTop: 20,
					color: "darkblue",
					textAlign: "center",
				}}
			>
				{randomNumber !== null
					? randomNumber
					: "Kliknij przycisk, aby zrobić pomiar"}
			</Text>
			<Button
				style={{ Bottom: 300 }}
				title="Zrób pomiar"
				onPress={generateRandomNumber}
				disabled={disabled}
			/>
			<Toast ref={(ref) => Toast.setRef(ref)} />
		</View>
	);
};

export default App;
