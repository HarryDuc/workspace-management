type Props = {
  params: {
    workspacesInviteId: string;
  };
};

export default async function WorkspacesInviteApp(props: Props) {
  const { workspacesInviteId } = await props.params;
  return (
    <div>{workspacesInviteId}</div>
  )
}