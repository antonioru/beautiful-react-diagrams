import { FunctionComponent } from 'react';
import { Callback, DefaultProps, Size, Renderer } from './_shared';

export type ModalProps = DefaultProps & {
  /**
   * This prop defines whether the modal is shown or not.
   */
  isOpen: boolean,
  /**
   * onShow will be performed when each time the modal will be open
   */
  onShow?: Callback<Event>,
  /**
   * Centered prop center the modal to place it in the middle of the screen viewport.
   */
  centered?: boolean,
  /**
   * It defines the modal's dimension
   */
  size?: Size,
  /**
   * It defines what kind of animation should be performed
   */
  animation?: 'none' | 'fade' | 'zoom' | 'slideRight' | 'slideLeft' | 'slideBottom' | 'slideTop',
  /**
   * If defined, this function will be run when clicking on backdrop
   */
  onBackdropClick: Callback<Event>,
  /**
   * this prop will replace the normal behavior of modal component
   */
  backdropRender: Renderer<ModalProps>,
};

declare const Modal: FunctionComponent<ModalProps> & { Title?: FunctionComponent } & { Body?: FunctionComponent } & { Footer?: FunctionComponent };

export default Modal;
