import { Image } from './shared/Image';

export interface UserPublic {
  display_name?: string;
  followers?: {
    total: number;
  };
  href: string;
  id: string;
  images?: Image[];
  type: 'user';
  uri: string;
}
