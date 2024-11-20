export interface EditFunctionType<T> {
  initialData: T;
  onEditFunction: (updatedData: T) => void;
}

export interface DeleteFunctionType {
  documentId: string;
  onDeleteFunction: (id: string) => void;
}
