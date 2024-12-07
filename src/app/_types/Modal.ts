import { FrontPost } from "./Post"

export type ModalProps = {
  isOpen: boolean,
  handleClose: () => void,
  post: FrontPost,
}