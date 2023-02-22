
import React, { PropsWithChildren } from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

  const HideKeyboard = ({ children }: PropsWithChildren) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} accessible={false}>
      {children}
    </TouchableWithoutFeedback>
  );

  export default HideKeyboard