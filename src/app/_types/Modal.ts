import { FrontPost } from "./Post"

// モーダルに関わる型
export type ModalProps = {
  isOpen: boolean,
  handleClose: () => void,
  post: FrontPost,
}