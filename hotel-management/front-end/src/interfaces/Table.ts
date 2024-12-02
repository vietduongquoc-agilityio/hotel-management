export interface EditFunctionType<T> {
  initialData: T;
  onEditFunction: <T>(updatedData: T) => void;
}

export interface DeleteFunctionType {
  documentId: string;
  onDeleteFunction: (id: string) => void;
}
