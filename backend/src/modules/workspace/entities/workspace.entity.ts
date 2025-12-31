export class WorkspaceEntity {
  id: string;
  email: string;
  username: string;
  createdAt: Date;

  constructor(partial: Partial<WorkspaceEntity>) {
    Object.assign(this, partial);
  }
}
