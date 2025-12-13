import {useState} from 'react';
import {View, Text, Button} from 'react-native';

const App = () => {
  const [count, setCount] = useState(0);

  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);
  const reset = () => setCount(0);

  return (
    <View>
      <Text>{`Count: ${count}`}</Text>
      <Button title="Increment" onPress={increment} />
      <Button title="Reset" onPress={reset} />
      <Button title="Decrement" onPress={decrement} />
    </View>
  );
};

export default App;