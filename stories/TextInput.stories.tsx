import React from 'react';
import TextInput, { Props } from '../src/FormItems/Basic/TextInput';

export default {
  label: 'TestInput',
  name: 'Input',
};

// By passing optional props to this story, you can control the props of the component when
// you consume the story in a test.
export const TextInputStory = (props?: Props) => <TextInput {...props} />;
