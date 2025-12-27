type Props = {
  params: {
    workspacesId: string;
  };
};

export default async function WorkspacesIdApp(props: Props) {
  const { workspacesId } = await props.params;
  return (
    <div>{workspacesId}</div>
  )
}