
/**
 * Represents a song (used in the player)
 */
export interface Song {
  /**
   * The title of the song
   */
  title: string;
  /**
   * THe name of the artist
   */
  artist: string;
  /**
   * The name of the album
   */
  album: string;
  /**
   * The URL of the album's image
   */
  imageUrl: string;
}
