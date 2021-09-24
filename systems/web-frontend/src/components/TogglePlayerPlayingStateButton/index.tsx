import type { AlbumSimplified } from '../../hooks/spotify/typings/Album';
import type { PlaylistSimplified } from '../../hooks/spotify/typings/Playlist';
import Pause from './pause.svg';
import Play from './play.svg';

export interface Props<T> {
  className?: string;
  isBelongCurrentTrack: boolean;
  item: T;
  onClickToggleButton: (context: any) => void;
}

export function TogglePlayerPlayingStateButton({
  isBelongCurrentTrack,
  className,
  onClickToggleButton,
  item,
}: Props<AlbumSimplified | PlaylistSimplified>) {
  return (
    <button
      aria-label={isBelongCurrentTrack ? 'pause-button' : 'play-button'}
      className={className}
      onClick={e => {
        e.preventDefault();
        e.stopPropagation();
        onClickToggleButton(item);
      }}
    >
      {isBelongCurrentTrack ? <Pause /> : <Play />}
    </button>
  );
}
