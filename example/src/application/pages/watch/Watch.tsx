import { Center, Inject, VStack } from "@ncodedcode/ncode_react_lib";
import { useState } from "react";
import { WatchViewModel, WatchViewModelClassName } from "./WatchViewModel";
import { observer } from "mobx-react";

export const Watch = observer(() => {
  const [viewModel] = useState(Inject<WatchViewModel>(WatchViewModelClassName));

  return (
    <Center>
      <VStack>
        {viewModel.progress && <h1>Loading..</h1>}
        {!viewModel.progress && <h1>{viewModel.displayTime}</h1>}
        <button onClick={() => viewModel.now()}>NOW</button>
      </VStack>
    </Center>
  );
});
