type Props = {
  params: {
    tasksId: string;
  };
};

export default async function TasksIdApp(props: Props) {
  const { tasksId } = await props.params;
  return (
    <div>{tasksId}</div>
  )
}