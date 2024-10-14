export interface ITask {
  _id: string;
  title: string;
  deadline: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TaskListProps {
  tasks: ITask[];
}

export interface ModalProps {
  openModal: boolean;
  setOpenModal: (open: boolean) => boolean | void;
  children: React.ReactNode;
}
