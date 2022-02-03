import { useState } from "react";
import {
  CounterViewModel,
  CounterViewModelClassName,
  CounterViewModelClassName2,
} from "./CounterViewModel";
import { Inject } from "@ncodedcode/ncode_react_lib";
import { Center, HStack, VStack } from "@ncodedcode/ncode_react_lib";
import { observer } from "mobx-react";

export const Counter = observer(() => {
  const [viewModel] = useState(
    Inject<CounterViewModel>(CounterViewModelClassName)
  );
  const [viewModel2] = useState(
    Inject<CounterViewModel>(CounterViewModelClassName2)
  );

  return (
    <Center>
      <VStack>
        <h1>{viewModel.value}</h1>
        <h2>{viewModel2.value}</h2>
        <HStack>
          <button
            onClick={() => {
              viewModel.decrease();
              viewModel2.decrease();
            }}
          >
            -
          </button>
          <button
            onClick={() => {
              viewModel.increase();
              viewModel2.increase();
            }}
          >
            +
          </button>
        </HStack>
      </VStack>
    </Center>
  );
});
