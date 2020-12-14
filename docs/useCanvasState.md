Since *Canvas* is a [controlled components](https://reactjs.org/docs/forms.html#controlled-components), it needs to 
be provided with a "*pan*" and a "*zoom*" states, and an "*onPanChange*" and an "*onZoomChange" handlers.

Being a *controlled component* allows extreme flexibility in manipulating the *Canvas* state at runtime, 
on the other hand, the operations performed on its states are quite often the same.

For this reason I've summed up the most common operations in the `useCanvasState` hook.

```typescript static
type CanvasMethods = {
  onPanChange: (panState: PanState) => unknown,
  onZoomChange: (zoom: number) => unknown,
}

type CanvasStates = {
  pan: PanState,
  zoom: number,
}

declare const useCanvasState: (initialStates: CanvasStates) => [CanvasStates, CanvasMethods];
```
