import { ElementType, FunctionComponent, ReactElement } from 'react';
import { Size, DefaultProps } from './_shared';
import { PillProps } from "./Pill";

export type AvatarProps = DefaultProps & {
  /**
   * Defines the avatar size
   */
  size?: Size,
  /**
   * Defines the avatar shape
   */
  shape?: 'rounded' | 'square',
  /**
   * The avatar image source
   */
  src?: string,
  /**
   * Shows the user's initials rather than her/his face
   */
  initials?: string,
  /**
   * The avatar image alternative text
   */
  alt?: string,
  /**
   * Shows a pill right under the image
   */
  pill?: string | ReactElement<PillProps>,
  /**
   * Defines the avatar shape
   */
  state?: 'offline' | 'online' | 'danger',
  /**
   * Defines the user display name
   */
  displayName?: string,
  /**
   * Defines some further user's information
   */
  furtherInfo?: string,
  /**
   * A render function to be used as the image component instead of the default one
   */
  ImageRender?: ElementType,
  /**
   * A render function to be used as the text component instead of the default one
   */
  TextRender?: ElementType,
  /**
   * A render function to be used as the wrapper element component instead of the default one
   */
  ElementRender?: ElementType,
};


declare const Avatar: FunctionComponent<AvatarProps>;

export default Avatar;
