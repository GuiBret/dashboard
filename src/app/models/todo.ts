
/**
 * Interface representing a todo element, formatted like in Mongo
 */
export interface Todo {
  /**
   * The ID of the todo
   */
  _id: string;

  /**
   * The title of the todo
   */
  title: string;
  /**
   * The content of the todo
   */
  content: string;

  /**
   * The status of the todo (not handled yet)
   */
  status: boolean;

  /**
   * The version (MongoDB specific parameter)
   */
  __v: number;
}
